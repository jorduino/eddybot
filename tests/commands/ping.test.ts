import { expect, test } from "bun:test";
import type { ChatInputCommandInteraction } from "discord.js";
import ping from "../../src/commands/ping";

test('ping.execute replies with "Pong!"', async () => {
	const calls: string[] = [];

	const interaction = {
		reply: async (msg: string) => {
			calls.push(msg);
		},
	} as unknown as ChatInputCommandInteraction;

	await ping.execute(interaction);

	expect(calls.length).toBe(1);
	expect(calls[0]).toBe("Pong!");
});
