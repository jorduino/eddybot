import {
	ChatInputCommandInteraction,
	InteractionContextType,
	MessageFlags,
	SlashCommandBuilder,
} from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("nick")
		.setDescription("Set the nickname of the tagged user(s).")
		.addUserOption(option =>
			option.setName("user").setDescription("User to set nickname").setRequired(true),
		)
		.addStringOption(option =>
			option.setName("nickname").setDescription("New nickname").setRequired(true),
		)
		.setContexts([InteractionContextType.Guild]),
	async execute(interaction: ChatInputCommandInteraction) {
		if (!interaction.inCachedGuild()) {
			await interaction.reply({
				content: "This command can only be used in a server.",
				flags: MessageFlags.Ephemeral,
			});
			return;
		}

		const targetUser = interaction.options.getUser("user", true);
		const newNickname = interaction.options.getString("nickname", true);

		const guildMember = await interaction.guild.members.fetch(targetUser.id);

		try {
			if (interaction.client.user.id === targetUser.id) {
				await interaction.guild.members.me?.setNickname(newNickname);
			} else {
				await guildMember.edit({ nick: newNickname });
			}
			await interaction.reply({
				content: `Successfully changed ${targetUser}'s nickname to ${newNickname}`,
			});
		} catch (error) {
			console.error("Couldn't change nickname\n" + error);
			await interaction.reply({
				content: "I do not have permission to change that nickname.",
				flags: MessageFlags.Ephemeral,
			});
		}
	},
};
