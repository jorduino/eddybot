import { expect, test } from "bun:test";
import type { ChatInputCommandInteraction } from "discord.js";
import beep from "../../commands/beep";

test('beep.execute replies with "Boop."', async () => {
	const calls: unknown[] = [];

	const interaction = {
		reply: async (msg: unknown) => {
			calls.push(msg);
		},
	} as unknown as ChatInputCommandInteraction;

	await beep.execute(interaction);

	expect(calls.length).toBe(1);
	expect(calls[0]).toBe("Boop.");
});
