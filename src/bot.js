import path from "node:path";
import { Client, GatewayIntentBits, MessageFlags } from "discord.js";
import Figlet from "figlet";
import config from "../config.json" with { type: "json" };
import deployCommands from "./deploy-commands.js";

const token = config.token;

import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

await deployCommands(client, config);

client
	.once("clientReady", async () => {
		//prints bot's name in large ascii
		// console.clear();
		Figlet(client.user.username, (err, data) => {
			if (err) {
				console.log(constants.bot.user.username.toUpperCase());
				console.dir(err);
				return;
			}
			console.log(data);
			console.log("Bot is ready");
		});
	})
	.on("interactionCreate", async interaction => {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			// printSentMessage(interaction)
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: "There was an error while executing this command!",
				flags: MessageFlags.Ephemeral,
			});
		}
	})
	.login(token);
