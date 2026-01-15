import {
	ChatInputCommandInteraction,
	InteractionContextType,
	MessageFlags,
	SlashCommandBuilder,
} from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Display info about this server.")
		.setContexts([InteractionContextType.Guild]),
	async execute(interaction: ChatInputCommandInteraction) {
		if (!interaction.inCachedGuild()) {
			await interaction.reply({
				content: "This command can only be used in a server.",
				flags: MessageFlags.Ephemeral,
			});
			return;
		}

		await interaction.reply(
			`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
		);
	},
};
