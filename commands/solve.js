import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import Algebrite from 'algebrite'

export default {
	data: new SlashCommandBuilder()
		.setName('solve')
		.setDescription('Uses algebrite CAS to solve an expression, returns an image of result')
		.addStringOption(option =>
			option.setName('expression')
				.setDescription('Algebrite expression')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('background')
				.setDescription('Background color of image (black by default)')
				.addChoices(
					{ name: 'Black', value: 'bg_black' },
					{ name: 'White', value: 'bg_white' },
					{ name: 'Transparent', value: '\\' },
				)),
	async execute(interaction, args) {
		const expression = interaction.options.getString('expression');
		let evaluation = Algebrite.run(`printlatex(${expression})`);
		let bg = interaction.options.getString('background');

		let clnEval = evaluation.replace(/ /g, "&space;")
		const latexImage = new EmbedBuilder()
			.setTitle("`" + expression + ":`")
			.setImage(`https://latex.codecogs.com/png.latex?\\${bg}&space;\\huge&space;${clnEval}`);

		await interaction.reply({ embeds: [latexImage] });
	}
}