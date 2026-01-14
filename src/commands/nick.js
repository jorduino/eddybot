import { InteractionContextType, MessageFlags, SlashCommandBuilder } from "discord.js";

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
	async execute(interaction) {
		const targetUser = interaction.options.getUser("user");
		const newNickname = interaction.options.getString("nickname");
		const guildMember = await interaction.guild.members.fetch(targetUser.id); // Get the GuildMember object
		try {
			if (interaction.client.user.id === targetUser.id) {
				await interaction.guild.members.me.setNickname(newNickname);
			} else {
				await guildMember.edit({ nick: newNickname }, "Bot changed the nickname");
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
