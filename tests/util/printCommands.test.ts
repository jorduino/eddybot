import { expect, test } from "bun:test";
import { InteractionContextType, SlashCommandBuilder } from "discord.js";
import printCommands from "../../src/util/printCommands";

const PREFIX = "Successfully registered these commands:\n";

const globalCommand = new SlashCommandBuilder()
	.setName("global_command_name")
	.setDescription("globalCommandDescription")
	.toJSON();

const guildOnlyCommand = new SlashCommandBuilder()
	.setName("guild_only_command_name")
	.setDescription("guildOnlyCommandDescription")
	.setContexts([InteractionContextType.Guild])
	.toJSON();

test("printCommands works with global command", () => {
	const out = printCommands([globalCommand]);

	expect(out.startsWith(PREFIX)).toBe(true);
	expect(out).toContain(globalCommand.name);
	expect(out).not.toContain("(guild only)");
});

test("printCommands works with guild only command", () => {
	const out = printCommands([guildOnlyCommand]);

	expect(out.startsWith(PREFIX)).toBe(true);
	expect(out).toContain(guildOnlyCommand.name);
	expect(out).toContain("(guild only)");
});

test("printCommands works with 2 commands", () => {
	const out = printCommands([globalCommand, guildOnlyCommand]);

	expect(out.startsWith(PREFIX)).toBe(true);
	expect(out).toContain(globalCommand.name);
	expect(out).toContain(guildOnlyCommand.name);
});

test("printCommands works with no commands", () => {
	expect(printCommands([])).toBe(PREFIX);
});
