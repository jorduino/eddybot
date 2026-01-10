import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'

export default {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the tagged user(s), or your own avatar.')
		.addUserOption(option => option.setName('user')
			.setDescription('User to get avatar from')
			.setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const profileImage = new EmbedBuilder()
			.setTitle('Here is the profile picture')
			.setImage(user.displayAvatarURL({ dynamic: true }));

		await interaction.reply({ embeds: [profileImage] });
	},
};
