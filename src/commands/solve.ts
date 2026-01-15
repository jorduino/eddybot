import Algebrite from "algebrite";
import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	MessageFlags,
	SlashCommandBuilder,
} from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("solve")
		.setDescription("Uses algebrite CAS to solve an expression, returns an image of result")
		.addStringOption(option =>
			option.setName("expression").setDescription("Algebrite expression").setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName("background")
				.setDescription("Background color of image (black by default)")
				.addChoices(
					{ name: "Black", value: "\\bg_black" },
					{ name: "White", value: "\\bg_white" },
					{ name: "Transparent", value: " " },
				),
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const expression = interaction.options.getString("expression");
		const evaluation = Algebrite.run(`printlatex(${expression})`);
		const bg = (interaction.options.getString("background") ?? "\\bg_black").trim();

		const clnEval = evaluation.replace(/ /g, "&space;");
		const url = `https://latex.codecogs.com/png.latex?${bg}\\huge&space;${clnEval}`;
		try {
			const latexImage = new EmbedBuilder().setTitle("`" + expression + ":`").setImage(url);
			await interaction.reply({ embeds: [latexImage] });
		} catch (err) {
			console.error(`Error creating latexImage with url "${url}"!\n${err}`);
			await interaction.reply({
				content: "There was an error solving that.",
				flags: MessageFlags.Ephemeral,
			});
		}
	},
};
