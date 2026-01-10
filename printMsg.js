import chalk from 'chalk';
import { Message } from 'discord.js';
function createMessage(msg, boxColor = chalk,) {

}
function printSentMessage(message) {
	if (!(message instanceof Message)) {
		throw new TypeError('printMessage expects a Discord Message object');
	}

	const serverName = message.guild?.name ?? 'DM';
	const channelName = `#${message.channel?.name ?? 'Unknown channel'}`;

	const username = message.author?.username ?? 'Unknown user';
	const content = message.content ?? '[No content]';
}
function sentMessage(message) {
	let servername = message.guild?.name || 'idk';
	let channelname = "#" + message.channel?.name || 'a private server maybe?';
	let data = 'there was no message?'.red;
	let username = message.author?.username || "no user?";
	let oldContent = message.content || message;
	let newContent = newMessage?.content || newMessage;
	const {
		commandName,
		user,
		member,
		guild,
		channel
	} = interaction;

	if (message && newMessage) {
		data =
			'\n┌──────────────────────────────────────────────────────'.red +
			'\n│'.red + (new Date() + '').red +
			'\n│'.red + username.blue + ' changed :' +
			'\n│'.red +
			'\n│'.red + '"' + oldContent.cyan + '"' +
			'\n│'.red + 'to' +
			'\n│'.red + '"' + newContent.cyan + '"' +
			'\n│'.red +
			'\n│'.red + 'on ' + servername.yellow + channelname.red +
			'\n└──────────────────────────────────────────────────────\n'
				.red
	} else if (message) {
		data =
			'\n┌──────────────────────────────────────────────────────'.cyan +
			'\n│'.cyan + (new Date() + '').cyan +
			'\n│'.cyan + username.blue + ' said :' +
			'\n│'.cyan +
			'\n│'.cyan + '"' + oldContent.yellow + '"' +
			'\n│'.cyan +
			'\n│'.cyan + ' on ' + servername.yellow + channelname.red +
			'\n└──────────────────────────────────────────────────────\n'
				.cyan
	}
	console.log(data)
}
function changedMessage(message, newMessage) {
	let servername = message.guild?.name || 'idk';
	let channelname = "#" + message.channel?.name || 'a private server maybe?';
	let data = 'there was no message?'.red;
	let username = message.author?.username || "no user?";
	let oldContent = message.content || message;
	let newContent = newMessage?.content || newMessage;
	const {
		commandName,
		user,
		member,
		guild,
		channel
	} = interaction;

	if (message && newMessage) {
		data =
			'\n┌──────────────────────────────────────────────────────'.red +
			'\n│'.red + (new Date() + '').red +
			'\n│'.red + username.blue + ' changed :' +
			'\n│'.red +
			'\n│'.red + '"' + oldContent.cyan + '"' +
			'\n│'.red + 'to' +
			'\n│'.red + '"' + newContent.cyan + '"' +
			'\n│'.red +
			'\n│'.red + 'on ' + servername.yellow + channelname.red +
			'\n└──────────────────────────────────────────────────────\n'
				.red
	} else if (message) {
		data =
			'\n┌──────────────────────────────────────────────────────'.cyan +
			'\n│'.cyan + (new Date() + '').cyan +
			'\n│'.cyan + username.blue + ' said :' +
			'\n│'.cyan +
			'\n│'.cyan + '"' + oldContent.yellow + '"' +
			'\n│'.cyan +
			'\n│'.cyan + ' on ' + servername.yellow + channelname.red +
			'\n└──────────────────────────────────────────────────────\n'
				.cyan
	}
	console.log(data)
}
export { printSentMessage, sentMessage, changedMessage }