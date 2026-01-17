import { expect, test } from "bun:test";
import type {
	ChatInputCommandInteraction,
	EmbedBuilder,
	InteractionReplyOptions,
} from "discord.js";
import avatar from "../../src/commands/avatar";

test("expect avatar.execute to return an embed containing the user's avatar URL", async () => {
	const calls: InteractionReplyOptions[] = [];

	const interaction = {
		options: {
			getUser: (_name: string, _required?: boolean) => ({
				displayAvatarURL: () => "https://example.org/a.png",
			}),
		},
		reply: async (msg: InteractionReplyOptions) => {
			calls.push(msg);
		},
	} as unknown as ChatInputCommandInteraction;

	await avatar.execute(interaction);

	expect(calls.length).toBe(1);

	const payload = calls[0]!; // safe after length assertion
	expect(payload.embeds).toBeDefined();
	expect(payload.embeds?.length).toBe(1);

	const embed = payload.embeds![0] as EmbedBuilder;
	const embedJson = embed.toJSON();

	expect(embedJson.title).toBe("Here is the profile picture");
	expect(embedJson.image?.url).toBe("https://example.org/a.png");
});
