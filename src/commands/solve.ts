import nerdamer from "nerdamer";
import "nerdamer/Algebra";
import "nerdamer/Calculus";
import "nerdamer/Solve";
import {
	ChatInputCommandInteraction,
	EmbedBuilder,
	MessageFlags,
	SlashCommandBuilder,
} from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("solve")
		.setDescription("Uses nerdamer CAS to solve an expression, returns an image of result")
		.addStringOption(option =>
			option.setName("expression").setDescription("Math expression").setRequired(true),
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
		try {
			const evaluation = nerdamer(expression!).toTeX();
			const bg = (interaction.options.getString("background") ?? "\\bg_black").trim();

			const clnEval = evaluation.replace(/ /g, "&space;");
			const url = `https://latex.codecogs.com/png.latex?${bg}\\huge&space;${clnEval}`;
			try {
				const latexImage = new EmbedBuilder()
					.setTitle("`" + expression + ":`")
					.setImage(url);
				await interaction.reply({ embeds: [latexImage] });
			} catch (err) {
				console.error(`Error creating latexImage with url "${url}"!\n${err}`);
				await interaction.reply({
					content: "There was an error solving that.",
					flags: MessageFlags.Ephemeral,
				});
			}
		} catch (err) {
			console.error(`Error evaluating ${expression}:\n${err}`);
			await interaction.reply({
				content: [
					`There was an error solving that:`,
					`Expression: \`${expression}\``,
					`Error: \`${err instanceof Error ? err.message : String(err)}\``,
				].join("\n"),
				flags: MessageFlags.Ephemeral,
			});
		}
	},
};
