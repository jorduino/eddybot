let Discord = require('discord.js')

module.exports = {
	name: 'kick',
	description: 'Tag a member and kick them (but not really).',
	guildOnly: true,
	usage: "kick <@user> <reason>",
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = message.mentions.members.first();

		if (!message.member.hasPermission("KICK_MEMBERS")) {
			return message.channel.send(`**${message.author.username}**, You do not have enough permission to use this command`)
		}

		if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
			return message.channel.send(`**${message.author.username}**, I do not have enough permission to use this command`)
		}

		if (!args[1]) {
			return message.channel.send(`**${message.author.username}**, Please Give Reason to ban`)
		}
		taggedUser.kick(args[1]);
		let embed = new Discord.MessageEmbed()
			.setTitle("Action: Kick")
			.setDescription(`Banned ${taggedUser} (${taggedUser.id})`)
			.setColor("#ff2050")
			.setFooter(`Banned by ${message.author.username}`);

		message.channel.send(embed)




	},
};
