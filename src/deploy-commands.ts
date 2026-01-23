import { REST } from "@discordjs/rest";
import type { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { Client, Collection, Routes } from "discord.js";
import allCommands from "./commands";
import type { Command, Config } from "./types/commands";
import printCommands from "./util/printCommands";

export default async (client: Client, config: Config) => {
	const { clientId, token } = config;
	const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
	client.commands = new Collection<string, Command>();

	for (const command of allCommands) {
		commands.push(command.data.toJSON());
		client.commands.set(command.data.name, command);
	}

	const rest = new REST({ version: "10" }).setToken(token);

	await rest
		.put(Routes.applicationCommands(clientId), { body: commands })
		.then(() => console.log(printCommands(commands)))
		.catch(e => console.error("Error registering commands!\n" + e));
};
