import { expect, test } from "bun:test";
import type { ChatInputCommandInteraction } from "discord.js";
import rip from "../../commands/rip";

function createResponse(user: string, born: string, died: string) {
	return "Here lies " + user + "\nThey will be missed\n" + "Born:" + born + "\nDied:" + died;
}

function createInteraction(values: { user: string; born?: string | null; died?: string | null }) {
	const calls: string[] = [];

	const interaction = {
		options: {
			getString: (name: string) => {
				return (
					{
						user: values.user,
						born: values.born ?? null,
						died: values.died ?? null,
					}[name] ?? null
				);
			},
		},
		reply: async (msg: string) => {
			calls.push(msg);
		},
	} as unknown as ChatInputCommandInteraction;

	return { interaction, calls };
}

test("rip.execute replies correctly without born and without died", async () => {
	const { calls, interaction } = createInteraction({ user: "testUser" });

	await rip.execute(interaction);

	expect(calls.length).toBe(1);
	expect(calls[0]).toBe(createResponse("testUser", "420", "6969"));
});

test("rip.execute replies correctly with born and without died", async () => {
	const { calls, interaction } = createInteraction({ user: "testUser", born: "bornDate" });

	await rip.execute(interaction);

	expect(calls.length).toBe(1);
	expect(calls[0]).toBe(createResponse("testUser", "bornDate", "6969"));
});

test("rip.execute replies correctly without born and with died", async () => {
	const { calls, interaction } = createInteraction({ user: "testUser", died: "diedDate" });

	await rip.execute(interaction);

	expect(calls.length).toBe(1);
	expect(calls[0]).toBe(createResponse("testUser", "420", "diedDate"));
});

test("rip.execute replies correctly with born and with died", async () => {
	const { calls, interaction } = createInteraction({
		user: "testUser",
		born: "bornDate",
		died: "diedDate",
	});

	await rip.execute(interaction);

	expect(calls.length).toBe(1);
	expect(calls[0]).toBe(createResponse("testUser", "bornDate", "diedDate"));
});
