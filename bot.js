const fs = require('node:fs');
const path = require('node:path');
const Figlet = require('figlet');
const { deploy_commands } = require('./deploy-commands');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

deploy_commands();

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
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
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})
	.login(token);
