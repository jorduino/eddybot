import { expect, spyOn, test } from "bun:test";
import type { ChatInputCommandInteraction } from "discord.js";
import Figlet from "figlet";
import figletCommand from "../../commands/figlet";

test("figlet.execute replies with wrapped figlet output", async () => {
	const spy = spyOn(Figlet, "text").mockImplementation(async () => "BIG TEXT");

	let replied: unknown;

	const interaction = {
		options: { getString: () => "hello" },
		reply: async (value: unknown) => {
			replied = value;
		},
	} as unknown as ChatInputCommandInteraction;

	await figletCommand.execute(interaction);

	expect(spy).toHaveBeenCalledWith("hello");
	expect(replied).toBe("```\nBIG TEXT\n```");

	spy.mockRestore();
});
