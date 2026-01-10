import { SlashCommandBuilder } from 'discord.js'

export default {
	data: new SlashCommandBuilder()
		.setName('source')
		.setDescription('Gives source code for eddybot'),
	execute(interaction) {
		interaction.reply('Heres my source code!\nhttps://github.com/jorduino/eddybot.git')
	}
}