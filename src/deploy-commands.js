import fs from "node:fs";
import path from "node:path";
import { REST } from "@discordjs/rest";
import { Collection, Routes } from "discord.js";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (client, config) => {
	const { clientId, token } = config;
	const commands = [];
	client.commands = new Collection();
	const commandsPath = path.join(__dirname, "commands");
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const { default: command } = await import(filePath);
		commands.push(command.data.toJSON());
		client.commands.set(command.data.name, command);
	}

	const rest = new REST({ version: "10" }).setToken(token);

	await rest
		.put(Routes.applicationCommands(clientId), { body: commands })
		.then(() => console.log("Successfully registered application commands."))
		.catch(e => console.error("Error registering commands!\n" + e));
};
