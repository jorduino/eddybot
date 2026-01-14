import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Figlet from "figlet";

export default {
	data: new SlashCommandBuilder()
		.setName("figlet")
		.setDescription("Prints messages with big characters")
		.addStringOption(option =>
			option.setName("message").setDescription("Message to figletify").setRequired(true),
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const words = interaction.options.getString("message", true);
		const out = "```\n" + (await Figlet.text(words)) + "\n```";
		await interaction.reply(out);
	},
};
