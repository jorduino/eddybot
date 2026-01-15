import { expect, test } from "bun:test";
import type { ChatInputCommandInteraction } from "discord.js";
import userInfo from "../../commands/user-info";

test("user-info.execute replies with user's info", async () => {
	const calls: string[] = [];

	const interaction = {
		reply: async (msg: string) => {
			calls.push(msg);
		},
		user: {
			username: "username",
			id: 123,
		},
	} as unknown as ChatInputCommandInteraction;

	await userInfo.execute(interaction);

	expect(calls.length).toBe(1);
	expect(calls[0]).toBe("Your username: username\nYour ID: 123");
});
