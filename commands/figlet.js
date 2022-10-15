const Figlet = require("figlet");
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('figlet')
        .setDescription('Prints messages with big characters')
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Message to figletify')
                .setRequired(true)),
    async execute(interaction, args) {

        let words = interaction.options.getString('message');
        let out;

        Figlet(words, function (err, data) {
            if (err) {
                consoleInfo += "error get:\n" + err;
                return;
            }
            out = "```\n" + data + "\n```";
        });
        await interaction.reply(out);
    }
}