import { expect, test } from "bun:test";
import type { ChatInputCommandInteraction } from "discord.js";
import source from "../../src/commands/source";

test("source.execute replies with github source", async () => {
	const calls: string[] = [];

	const interaction = {
		reply: async (msg: string) => {
			calls.push(msg);
		},
	} as unknown as ChatInputCommandInteraction;

	await source.execute(interaction);

	expect(calls.length).toBe(1);
	expect(calls[0]).toBe("Heres my source code!\nhttps://github.com/jorduino/eddybot.git");
});
