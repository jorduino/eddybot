const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('choose')
		.setDescription('Chooses between two given items')
		.addStringOption(option =>
			option.setName('option1')
				.setDescription('First Option')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('option2')
				.setDescription('Second Option')
				.setRequired(true)),
	async execute(interaction) {
		const options = [
			interaction.options.getString('option1'),
			interaction.options.getString('option2')
		];

		await interaction.reply(options[(Math.random() >= .5) ? 0 : 1])
	}
}