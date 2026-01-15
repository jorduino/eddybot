import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder().setName("beep").setDescription("Beep!"),
	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.reply("Boop.");
	},
};
