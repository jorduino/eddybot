import { expect, test } from "bun:test";
import type {
	ChatInputCommandInteraction,
	EmbedBuilder,
	InteractionReplyOptions,
} from "discord.js";
import solve from "../../commands/solve";

test("solve.execute replies with black bg", async () => {
	const calls: InteractionReplyOptions[] = [];

	const interaction = {
		options: {
			getString: (name: string) => {
				return (
					{
						expression: "1+1",
						background: "\\bg_black",
					}[name] ?? null
				);
			},
		},
		reply: async (msg: InteractionReplyOptions) => {
			calls.push(msg);
		},
	} as unknown as ChatInputCommandInteraction;

	await solve.execute(interaction);

	expect(calls.length).toBe(1);

	const payload = calls[0]!; // safe after length assertion
	expect(payload.embeds).toBeDefined();
	expect(payload.embeds?.length).toBe(1);

	const embed = payload.embeds![0] as EmbedBuilder;
	const embedJson = embed.toJSON();

	expect(embedJson.title).toBe("`1+1:`");
	expect(embedJson.image?.url).toBe(
		"https://latex.codecogs.com/png.latex?\\bg_black\\huge&space;2",
	);
});

test("solve.execute replies with white bg", async () => {
	const calls: InteractionReplyOptions[] = [];

	const interaction = {
		options: {
			getString: (name: string) => {
				return (
					{
						expression: "1+1",
						background: "\\bg_white",
					}[name] ?? null
				);
			},
		},
		reply: async (msg: InteractionReplyOptions) => {
			calls.push(msg);
		},
	} as unknown as ChatInputCommandInteraction;

	await solve.execute(interaction);

	expect(calls.length).toBe(1);

	const payload = calls[0]!; // safe after length assertion
	expect(payload.embeds).toBeDefined();
	expect(payload.embeds?.length).toBe(1);

	const embed = payload.embeds![0] as EmbedBuilder;
	const embedJson = embed.toJSON();

	expect(embedJson.title).toBe("`1+1:`");
	expect(embedJson.image?.url).toBe(
		"https://latex.codecogs.com/png.latex?\\bg_white\\huge&space;2",
	);
});

test("solve.execute replies with transparent bg", async () => {
	const calls: InteractionReplyOptions[] = [];

	const interaction = {
		options: {
			getString: (name: string) => {
				return (
					{
						expression: "1+1",
						background: " ",
					}[name] ?? null
				);
			},
		},
		reply: async (msg: InteractionReplyOptions) => {
			calls.push(msg);
		},
	} as unknown as ChatInputCommandInteraction;

	await solve.execute(interaction);

	expect(calls.length).toBe(1);

	const payload = calls[0]!; // safe after length assertion
	expect(payload.embeds).toBeDefined();
	expect(payload.embeds?.length).toBe(1);

	const embed = payload.embeds![0] as EmbedBuilder;
	const embedJson = embed.toJSON();

	expect(embedJson.title).toBe("`1+1:`");
	expect(embedJson.image?.url).toBe("https://latex.codecogs.com/png.latex?\\huge&space;2");
});
