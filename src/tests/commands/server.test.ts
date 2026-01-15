import { expect, test } from "bun:test";
import {
	type ChatInputCommandInteraction,
	type InteractionReplyOptions,
	MessageFlags,
} from "discord.js";
import server from "../../commands/server";

test("expect server.execute to return the guild's info", async () => {
	const calls: string[] = [];
	const interaction = {
		inCachedGuild: () => true,
		guild: {
			name: "guildName",
			memberCount: 1,
		},
		reply: async (msg: string) => {
			calls.push(msg);
		},
	} as unknown as ChatInputCommandInteraction;

	await server.execute(interaction);
	expect(calls.length).toBe(1);
	expect(calls[0]).toBe("Server name: guildName\nTotal members: 1");
});

test("expect server.execute to fail outside of guild context", async () => {
	const calls: InteractionReplyOptions[] = [];
	const interaction = {
		inCachedGuild: () => false,
		reply: async (msg: InteractionReplyOptions) => {
			calls.push(msg);
		},
	} as unknown as ChatInputCommandInteraction;

	await server.execute(interaction);
	expect(calls.length).toBe(1);
	expect(calls[0]?.content).toBe("This command can only be used in a server.");
	expect(calls[0]?.flags).toBe(MessageFlags.Ephemeral);
});
