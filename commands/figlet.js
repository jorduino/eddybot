import Figlet from "figlet";
import { SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("figlet")
		.setDescription("Prints messages with big characters")
		.addStringOption(option =>
			option.setName("message").setDescription("Message to figletify").setRequired(true),
		),
	async execute(interaction, args) {
		let words = interaction.options.getString("message");
		let out = "```\n" + (await Figlet.text(words)) + "\n```";
		await interaction.reply(out);
	},
};
