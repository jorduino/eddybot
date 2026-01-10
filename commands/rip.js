import { SlashCommandBuilder } from 'discord.js'

export default {
	data: new SlashCommandBuilder()
		.setName('rip')
		.setDescription('custom tombstone')
		.addStringOption(option =>
			option.setName('user')
				.setDescription('User on the tombstone')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('born')
				.setDescription('Year they were born'))
		.addStringOption(option =>
			option.setName('died')
				.setDescription('Year they died')),
	async execute(interaction) {
		const user = interaction.options.getString('user');
		const born = interaction.options.getString('born') || 420;
		const died = interaction.options.getString('died') || 6969;

		interaction.reply("Here lies " + user + "\nThey will be missed\n" + "Born:" + born + "\nDied:" + died);

	}
}