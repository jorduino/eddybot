import { type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("choose")
		.setDescription("Chooses between two given items")
		.addStringOption(option =>
			option.setName("option1").setDescription("First Option").setRequired(true),
		)
		.addStringOption(option =>
			option.setName("option2").setDescription("Second Option").setRequired(true),
		),

	async execute(interaction: ChatInputCommandInteraction) {
		const option1 = interaction.options.getString("option1", true);
		const option2 = interaction.options.getString("option2", true);

		const choice = Math.random() >= 0.5 ? option1 : option2;

		await interaction.reply(choice);
	},
};
