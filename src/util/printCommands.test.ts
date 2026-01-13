import { test, expect } from "bun:test";
import { InteractionContextType, SlashCommandBuilder } from "discord.js";
import printCommands from "./printCommands";

const PREFIX = "Successfully registered these\n";

const globalCommand = new SlashCommandBuilder()
	.setName("global_command_name")
	.setDescription("globalCommandDescription")
	.toJSON();

const guildOnlyCommand = new SlashCommandBuilder()
	.setName("guild_only_command_name")
	.setDescription("guildOnlyCommandDescription")
	.setContexts([InteractionContextType.Guild])
	.toJSON();

test("printCommands works with 1 command", () => {
	expect(printCommands([globalCommand])).toBe(`${PREFIX}${globalCommand.name}`);
});

test("printCommands works with 2 commands", () => {
	expect(printCommands([globalCommand, guildOnlyCommand])).toBe(
		`${PREFIX}${globalCommand.name}\n${guildOnlyCommand.name}`,
	);
});

test("printCommands works with no commands", () => {
	expect(printCommands([])).toBe(PREFIX);
});
