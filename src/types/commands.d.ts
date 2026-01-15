import type {
	ChatInputCommandInteraction,
	RESTPostAPIChatInputApplicationCommandsJSONBody,
	SlashCommandBuilder,
} from "discord.js";

export type Config = {
	clientId: string;
	token: string;
};

export type Command = {
	data: SlashCommandBuilder;
	execute(interaction: ChatInputCommandInteraction): Promise<void>;
};

export type CommandJSONList = RESTPostAPIChatInputApplicationCommandsJSONBody[];
