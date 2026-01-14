import { expect, test } from "bun:test";
import type { ChatInputCommandInteraction } from "discord.js";
import choose from "../../commands/choose";

test("choose.execute replies with option1 when Math.random >= 0.5", async () => {
	const originalRandom = Math.random;
	Math.random = () => 0.9;

	const calls: unknown[] = [];

	const interaction = {
		options: {
			getString: (name: string) => (name === "option1" ? "A" : "B"),
		},
		reply: async (value: unknown) => {
			calls.push(value);
		},
	} as unknown as ChatInputCommandInteraction;

	await choose.execute(interaction);

	expect(calls.length).toBe(1);
	expect(calls[0]).toBe("A");

	Math.random = originalRandom;
});

test("choose replies with option2 when Math.random < 0.5", async () => {
	const originalRandom = Math.random;
	Math.random = () => 0.1;

	const calls: unknown[] = [];

	const interaction = {
		options: {
			getString: (name: string) => (name === "option1" ? "A" : "B"),
		},
		reply: async (value: unknown) => {
			calls.push(value);
		},
	} as unknown as ChatInputCommandInteraction;

	await choose.execute(interaction);

	expect(calls.length).toBe(1);
	expect(calls[0]).toBe("B");

	Math.random = originalRandom;
});
