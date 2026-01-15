import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("source")
		.setDescription("Gives source code for eddybot"),
	execute(interaction: ChatInputCommandInteraction) {
		interaction.reply("Heres my source code!\nhttps://github.com/jorduino/eddybot.git");
	},
};
