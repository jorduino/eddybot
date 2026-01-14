// nick.test.ts
import { expect, test } from "bun:test";
import type { ChatInputCommandInteraction } from "discord.js";
import { MessageFlags } from "discord.js";
import nick from "../../commands/nick";

type ReplyPayload = unknown;

type FakeGuildMember = {
	edit: (data: { nick: string }) => Promise<void>;
};

type FakeGuild = {
	members: {
		fetch: (id: string) => Promise<FakeGuildMember>;
		me?: {
			setNickname: (nick: string) => Promise<void>;
		};
	};
};

type FakeInteraction = {
	client: { user: { id: string } };
	inCachedGuild: () => boolean;
	options: {
		getUser: (name: string, required?: boolean) => { id: string; toString(): string };
		getString: (name: string, required?: boolean) => string;
	};
	guild: FakeGuild | null;
	reply: (payload: ReplyPayload) => Promise<void>;
	__replies: ReplyPayload[];
};

function makeUser(id: string) {
	return {
		id,
		toString() {
			return `<@${id}>`;
		},
	};
}

function makeInteraction(params: {
	inCachedGuild: boolean;
	botId?: string;
	targetUserId?: string;
	nickname?: string;
	fetchImpl?: (id: string) => Promise<FakeGuildMember>;
	setNicknameImpl?: (nick: string) => Promise<void>;
}): ChatInputCommandInteraction & { __replies: ReplyPayload[] } {
	const replies: ReplyPayload[] = [];

	const interaction: FakeInteraction = {
		client: { user: { id: params.botId ?? "bot-id" } },
		inCachedGuild: () => params.inCachedGuild,

		options: {
			getUser: () => makeUser(params.targetUserId ?? "user-id"),
			getString: () => params.nickname ?? "NewNick",
		},

		reply: async (payload: ReplyPayload) => {
			replies.push(payload);
		},

		guild: params.inCachedGuild
			? {
					members: {
						fetch:
							params.fetchImpl ??
							(async () => ({
								edit: async () => {},
							})),
						me: params.setNicknameImpl
							? { setNickname: params.setNicknameImpl }
							: undefined,
					},
				}
			: null,

		__replies: replies,
	};

	return interaction as unknown as ChatInputCommandInteraction & {
		__replies: ReplyPayload[];
	};
}

test("replies ephemerally when not in a cached guild", async () => {
	const i = makeInteraction({ inCachedGuild: false });

	await nick.execute(i);

	expect(i.__replies[0]).toEqual({
		content: "This command can only be used in a server.",
		flags: MessageFlags.Ephemeral,
	});
});

test("edits another user's nickname", async () => {
	let editArg: { nick: string } | undefined;

	const i = makeInteraction({
		inCachedGuild: true,
		targetUserId: "user-123",
		nickname: "CoolNick",
		fetchImpl: async () => ({
			edit: async data => {
				editArg = data;
			},
		}),
	});

	await nick.execute(i);

	expect(editArg).toEqual({ nick: "CoolNick" });
});

test("edits bot's own nickname", async () => {
	let setNicknameArg: string | undefined;

	const i = makeInteraction({
		inCachedGuild: true,
		botId: "bot-id",
		targetUserId: "bot-id",
		nickname: "BotNick",
		setNicknameImpl: async nick => {
			setNicknameArg = nick;
		},
	});

	await nick.execute(i);

	expect(setNicknameArg).toBe("BotNick");
});

test("on error, replies with ephemeral permission message", async () => {
	const i = makeInteraction({
		inCachedGuild: true,
		fetchImpl: async () => ({
			edit: async () => {
				throw new Error("no perms");
			},
		}),
	});

	await nick.execute(i);

	expect(i.__replies[0]).toEqual({
		content: "I do not have permission to change that nickname.",
		flags: MessageFlags.Ephemeral,
	});
});
