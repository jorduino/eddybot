import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { REST } from "@discordjs/rest";
import type { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { Client, Collection, Routes } from "discord.js";
import type { Command, Config } from "./types/commands"; // wherever you put them
import printCommands from "./util/printCommands";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (client: Client, config: Config) => {
	const { clientId, token } = config;
	const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
	client.commands = new Collection<string, Command>();
	const commandsPath = path.join(__dirname, "commands");
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter(file => file.endsWith(".js") || file.endsWith(".ts"));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const { default: command } = await import(filePath);
		commands.push(command.data.toJSON());
		client.commands.set(command.data.name, command);
	}

	const rest = new REST({ version: "10" }).setToken(token);

	await rest
		.put(Routes.applicationCommands(clientId), { body: commands })
		.then(() => console.log(printCommands(commands)))
		.catch(e => console.error("Error registering commands!\n" + e));
};
