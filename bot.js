function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
//variable declaration
const botsettings = require("../botsettings.json");
const Discord = require("discord.js");
const figlet = require("figlet");
const bot = new Discord.Client({
	disableEveryone: true
});
const HR="\n-----------------------------------------------\n";
const everyoneLink = "http://i0.kym-cdn.com/photos/images/facebook/001/291/661/4cf.jpg";
let msgLeft = parseInt(random(1, 500));
let keywords = ["salad", "visual studio", "sluts", "visual studio code", "python", "javascript"];



bot.on("ready", async () => {
	console.log("\n\n\n\n\n\n");
	figlet(bot.user.username, function (err, data) {
		if (err) {
			console.log(bot.user.username).toUpperCase();
			console.dir(err);
			return;
		}
		console.log(data);
		console.log("Bot is ready");
	});
});

bot.on("message", async message => {
	console.log(HR+message.author.username+`said : "` + message.content + `" on ` + message.channel.name + HR);
	if (message.author.bot || message.channel.type === "dm") return;
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);
	let words = "";
	let first = true;
	if (command == `eddybot`) {
		if (args.length == 1 && args[0] == "help") {
			message.channel.send(`I am eddybot. Current commands:\n\`${keywords}\` \n\`eddybot help\` \n\`eddybot messages <msgleft>\` \n\`rip <person> <born> <death> (default: born=420, death: 6969)\` `);
		} else if (args.length > 1 && args[0] == "help") {
			let output = "";
			for (let i = 1; i < args.length; i++) {
				output += args[i] + " ";
			}
			message.channel.send("Nothing to be done for " + output);
		}
		if (args.length == 2 && args[0] == "messages") {
			msgLeft = parseInt(args[1]);
		}
		if (message.content.toUpperCase().includes("OR")) {
			//worst line of code in the whole bot:
			message.channel.send(message.content.split(" ")[(Math.random() >= .5 ? message.content.toUpperCase().split(" ").indexOf("OR") - 1 : message.content.toUpperCase().split(" ").indexOf("OR") + 1)]);
		}
	}
	for (let i = 0; i < keywords.length; i++) {
		if (message.content.toUpperCase().includes(keywords[i].toUpperCase())) {
			if (first) {
				first = false;
				words += keywords[i];
			} else {
				words += ", and " + keywords[i];
			}
		}
	}
	let searchWords = ["@EVERYONE", "NO U ^∞", "NO U ^", "NO U^", "NO U", "YOUR MOM GAY", "UR MOM GAY", "YOUR DAD LESBIAN", "UR DAD LESBIAN", "YOUR SISTER A MISTER", "UR SISTER A MISTER", "YOUR BROTHER A MOTHER", "UR BROTHER A MOTHER", "YOUR GRANDPAP A TRAP", "UR GRANPAP A TRAP", "YOUR GRANNY A TRANNY", "UR GRANNY A TRANNY", "YOUR ANCESTORS INCESTORS", "UR ANCESTORS INCESTORS", "YOUR FAMILY TREE LGBT", "UR FAMILY TREE LGBT"];
	let answers = [everyoneLink, "", "No u ^∞", "No u ^∞", "No u ^2", "ur dad lesbian", "ur dad lesbian", "ur sister a mister", "ur sister a mister", "ur brother a mother", "ur brother a mother", "ur grandpap a trap", "ur grandpap a trap", "ur granny a tranny", "ur granny a tranny", "ur ancestors incestors", "ur ancestors incestors", "ur family tree LGBT", "ur family tree LGBT", "*dies*", "*dies*"];
	for (let i = 0; i < searchWords.length; i++) {
		if (message.content.toUpperCase().includes(searchWords[i])) {
			message.channel.send(answers[i]);
			return;
		}

	}

	if (command.toUpperCase() == "RIP") {
		message.channel.send("Here lies " + args[0] + "\nThey will be missed\n" + ((args.length == 3) ? ("Born:" + args[1] + "\nDied:" + args[2]) : ("Born:420\nDied:6969")));
	}
	if (words != "") {
		message.channel.send(`I'm such a slut for ${words}`);
	}
	if (msgLeft <= 0) {
		msgLeft = parseInt(random(1, 500));
		message.channel.send("I eat ass");
	} else {
		msgLeft--;
	}
	console.log(msgLeft + " messages left");
});

bot.login(botsettings.token);