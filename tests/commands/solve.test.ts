import { expect, test } from "bun:test";
import type {
	ChatInputCommandInteraction,
	EmbedBuilder,
	InteractionReplyOptions,
} from "discord.js";
import solve from "../../src/commands/solve";

function createMockInteraction(options: Record<string, string>) {
	const calls: InteractionReplyOptions[] = [];
	const interaction = {
		options: {
			getString: (name: string) => options[name] ?? null,
		},
		reply: async (msg: InteractionReplyOptions) => {
			calls.push(msg);
		},
	} as unknown as ChatInputCommandInteraction;
	return { interaction, calls };
}

function getEmbed(calls: InteractionReplyOptions[]) {
	expect(calls.length).toBe(1);
	const payload = calls[0]!;
	expect(payload.embeds).toBeDefined();
	expect(payload.embeds?.length).toBe(1);
	return (payload.embeds![0] as EmbedBuilder).toJSON();
}

test("solve.execute replies with black bg", async () => {
	const { interaction, calls } = createMockInteraction({
		expression: "1+1",
		background: "\\bg_black",
	});

	await solve.execute(interaction);

	const embed = getEmbed(calls);
	expect(embed.title).toBe("`1+1:`");
	expect(embed.image?.url).toBe("https://latex.codecogs.com/png.latex?\\bg_black\\huge&space;2");
});

test("solve.execute replies with white bg", async () => {
	const { interaction, calls } = createMockInteraction({
		expression: "1+1",
		background: "\\bg_white",
	});

	await solve.execute(interaction);

	const embed = getEmbed(calls);
	expect(embed.title).toBe("`1+1:`");
	expect(embed.image?.url).toBe("https://latex.codecogs.com/png.latex?\\bg_white\\huge&space;2");
});

test("solve.execute replies with transparent bg", async () => {
	const { interaction, calls } = createMockInteraction({
		expression: "1+1",
		background: " ",
	});

	await solve.execute(interaction);

	const embed = getEmbed(calls);
	expect(embed.title).toBe("`1+1:`");
	expect(embed.image?.url).toBe("https://latex.codecogs.com/png.latex?\\huge&space;2");
});

test("solve.execute fails gracefully", async () => {
	// solve(x) should fail as solve() requires 2 arguments
	const { interaction, calls } = createMockInteraction({
		expression: "solve(x)",
	});

	await solve.execute(interaction);

	expect(calls.length).toBe(1);
	const reply = calls[0]!.content;
	expect(reply).toStartWith("There was an error solving that:\n");
	expect(reply).toContain("Expression: `solve(x)`");
	expect(reply).toContain("Error: `solve requires a minimum of 2 arguments. 1 provided!: 1`");
});
