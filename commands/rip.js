const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rip')
        .setDescription('custom tombstone')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User on the tombstone')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('born')
                .setDescription('Year they were born'))
        .addNumberOption(option =>
            option.setName('died')
                .setDescription('Year they died')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const born = interaction.options.getNumber('born') || 420;
        const died = interaction.options.getNumber('died') || 6969;

        interaction.reply("Here lies " + user.member + "\nThey will be missed\n" + "Born:" + born + "\nDied:" + died);

    }
}