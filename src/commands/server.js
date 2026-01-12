import { InteractionContextType, SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Display info about this server.")
		.setContexts([InteractionContextType.Guild]),
	async execute(interaction) {
		await interaction.reply(
			`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
		);
	},
};
