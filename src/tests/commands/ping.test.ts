import { expect, test } from "bun:test";
import type { ChatInputCommandInteraction } from "discord.js";
import ping from "../../commands/ping";

test('ping.execute replies with "Pong!"', async () => {
	const calls: unknown[] = [];

	const interaction = {
		reply: async (msg: unknown) => {
			calls.push(msg);
		},
	} as unknown as ChatInputCommandInteraction;

	await ping.execute(interaction);

	expect(calls.length).toBe(1);
	expect(calls[0]).toBe("Pong!");
});
