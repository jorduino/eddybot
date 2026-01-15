import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("user-info")
		.setDescription("Display info about yourself."),
	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.reply(
			`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`,
		);
	},
};
