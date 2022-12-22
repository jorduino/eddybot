const Colors = require('colors');

module.exports = function (message, newMessage) {
	let servername = message.guild ? (message.guild.name || 'idk') : 'idk';
	let channelname = message.channel.name || 'a private server maybe?';
	let data = 'there was no message?'.red
	if (message && newMessage) {
		data =
			'\n┌──────────────────────────────────────────────────────'.red +
			'\n│'.red + (new Date() + '').red +
			'\n│'.red + message.author.username.blue + ' changed :' +
			'\n│'.red +
			'\n│'.red + '"' + Colors.cyan(message.content) + '"' +
			'\n│'.red + 'to' +
			'\n│'.red + '"' + Colors.cyan(newMessage.content) + '"' +
			'\n│'.red +
			'\n│'.red + 'on ' + Colors.yellow(servername) + Colors.red('#' + channelname) +
			'\n└──────────────────────────────────────────────────────\n'
				.red
	} else if (message) {
		data =
			'\n┌──────────────────────────────────────────────────────'.cyan +
			'\n│'.cyan + (new Date() + '').cyan +
			'\n│'.cyan + Colors.blue(message.author.username) + ' said :' +
			'\n│'.cyan +
			'\n│'.cyan + '"' + Colors.yellow(message.content) + '"' +
			'\n│'.cyan +
			'\n│'.cyan + ' on ' + Colors.yellow(servername) + '#' + Colors.red(channelname) +
			'\n└──────────────────────────────────────────────────────\n'
				.cyan
	}
	console.log(data)
}