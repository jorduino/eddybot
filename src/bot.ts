import { Client, GatewayIntentBits, MessageFlags } from "discord.js";
import Figlet from "figlet";
import standard from "figlet/fonts/Standard";
import deployCommands from "./deploy-commands.js";
import type { Config } from "./types/commands";

Figlet.parseFont("Standard", standard);

const token = process.env["DISCORD_TOKEN"];
const clientId = process.env["DISCORD_CLIENT_ID"];

if (!token || !clientId) {
	console.error("Missing required environment variables:");
	if (!token) console.error("  - DISCORD_TOKEN is not set");
	if (!clientId) console.error("  - DISCORD_CLIENT_ID is not set");
	console.error("\nSet these variables before running the bot:");
	console.error("  export DISCORD_TOKEN=your_bot_token");
	console.error("  export DISCORD_CLIENT_ID=your_client_id");
	process.exit(1);
}

const config: Config = { token, clientId };

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
