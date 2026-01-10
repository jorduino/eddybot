import fs from 'node:fs'
import path from 'node:path'
import Figlet from 'figlet'
import deploy_commands from './deploy-commands.js'
import { Client, Collection, GatewayIntentBits, MessageFlags } from 'discord.js'
import config from './config.json' with { type: 'json' };
const token = config.token;
import { printSentMessage } from './printMsg.js'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

await deploy_commands();

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	// const fileUrl = pathToFileURL(filePath).href;
	const { default: command } = await import(filePath);
	client.commands.set(command.data.name, command);
}

client.once('clientReady', async () => {
	//prints bot's name in large ascii
	// console.clear();
	Figlet(client.user.username, function (err, data) {
		if (err) {
			console.log(constants.bot.user.username.toUpperCase());
			console.dir(err);
			return;
		}
		console.log(data);
		console.log("Bot is ready");
	});
}).on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		// printSentMessage(interaction)
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
	}
})
	.login(token);
