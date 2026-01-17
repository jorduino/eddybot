import { expect, spyOn, test } from "bun:test";
import type { ChatInputCommandInteraction } from "discord.js";
import Figlet from "figlet";
import figletCommand from "../../src/commands/figlet";

test("figlet.execute replies with wrapped figlet output", async () => {
	const spy = spyOn(Figlet, "text").mockImplementation(async () => "BIG TEXT");

	const calls: string[] = [];

	const interaction = {
		options: { getString: () => "hello" },
		reply: async (msg: string) => {
			calls.push(msg);
		},
	} as unknown as ChatInputCommandInteraction;

	await figletCommand.execute(interaction);

	expect(spy).toHaveBeenCalledWith("hello");
	expect(calls.length).toBe(1);
	expect(calls[0]).toBe("```\nBIG TEXT\n```");

	spy.mockRestore();
});
