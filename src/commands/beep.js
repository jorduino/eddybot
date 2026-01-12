import { SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder().setName("beep").setDescription("Beep!"),
	async execute(interaction) {
		await interaction.reply("Boop.");
	},
};
