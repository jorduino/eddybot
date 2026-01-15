import { expect, test } from "bun:test";
import type { ChatInputCommandInteraction } from "discord.js";
import beep from "../../commands/beep";

test('beep.execute replies with "Boop."', async () => {
	const calls: string[] = [];

	const interaction = {
		reply: async (msg: string) => {
			calls.push(msg);
		},
	} as unknown as ChatInputCommandInteraction;

	await beep.execute(interaction);

	expect(calls.length).toBe(1);
	expect(calls[0]).toBe("Boop.");
});
