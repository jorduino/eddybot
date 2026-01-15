import { Client, GatewayIntentBits, MessageFlags } from "discord.js";
import Figlet from "figlet";
import config from "../config.json" with { type: "json" };
import deployCommands from "./deploy-commands.js";

const token = config.token;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

await deployCommands(client, config);

client
	.once("clientReady", async () => {
		//prints bot's name in large ascii
		const username = client?.user?.username ?? "unknown name";
		console.log(await Figlet.text(username));
	})
	.on("interactionCreate", async interaction => {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
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
