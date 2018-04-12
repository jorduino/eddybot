//variable declaration
const constants = require("./constants.js");

let msgLeft = parseInt(constants.random(1, 500));
let recentMessage = "";



//function that executes when the bot turns on

constants.bot.on("ready", async () => {
    console.log(constants.HR);

    //prints bot's name in large ascii 
    constants.figlet(constants.bot.user.username, function (err, data) {
        if (err) {
            console.log(constants.bot.user.username).toUpperCase();
            console.dir(err);
            return;
        }
        console.log(data);
        console.log("Bot is ready");
    });
});



//function that executes once a message is sent
constants.bot.on("message", async message => {
    recentMessage = message;

    //ignores messages that the bot sends and that are DM'ed
    if (message.author.bot || message.channel.type === "dm") return;

    //console logs what the message was and who said it on which channel
    console.log(constants.HR + "|" + message.author.username + ' said :\n|\n| "' + message.content + '"\n|\n| on ' + message.channel.name + constants.HR);

    /*
		seperates the message into more useable parts
		i.e. when recieve message "eddybot messages 15"
		messageArray = ["eddybot", "messgaes", "15"]
		command = "eddybot"
		args = ["messages", "15"]
	*/
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    //initializes variable that will later hold all 
    //trigger words that have been said in the message 
    //recieved (selected from variable slutWords)
    let words = "";

    //used for comma placement
    let first = true;

    if (command == 'eddybot') { //"eddybot" commands:
        if (args.length == 1 && args[0] == "help") { //"eddybot help":
            message.channel.send('I am eddybot. Current commands:\n' + constants.commands());
        } else if (args.length > 1 && args[0] == "help") { //"eddybot help ...":
            let output = "";
            for (let i = 1; i < args.length; i++) {
                output += args[i] + " ";
            }
            message.channel.send("Nothing to be done for `" + output + "`");
        }

        if (args.length == 2 && args[0] == "messages") { //"eddybot messages":
            msgLeft = parseInt(args[1]);
        }
        if (message.content.toUpperCase().includes(" OR ")) { //"eddybot ... or ...":
            message.channel.send(message.content.split(" ")[(Math.random() >= .5 ? message.content.toUpperCase().split(" ").indexOf("OR") - 1 : message.content.toUpperCase().split(" ").indexOf("OR") + 1)]);
        }
    }

    for (word of constants.slutWords) {
        if (message.content.toUpperCase().includes(word.toUpperCase())) {
            if (first) {
                first = false;
                words += word;
            } else {
                words += ", and " + word;
            }
        }
    }
    if (words != "") {
        message.channel.send(`I'm such a slut for ${words}`);
    }

    for (array of constants.searchWords) {
        for (word of array[0]) {
            if (message.content.toUpperCase().includes(word)) {
                message.channel.send(array[1]);
                return;
            }

        }
    }



    if (command.toUpperCase() == "RIP" && args > 0) {
        message.channel.send("Here lies " + args[0] + "\nThey will be missed\n" + ((args.length == 3) ? ("Born:" + args[1] + "\nDied:" + args[2]) : ("Born:420\nDied:6969")));
    }

    if (msgLeft <= 0) {
        msgLeft = parseInt(constants.random(1, 500));
        message.channel.send("I eat ass");
    } else {
        msgLeft--;
    }

});

let stdin = process.openStdin();

stdin.addListener("data", function (d) {
    if (recentMessage != "") {
        recentMessage.channel.send(d.toString().trim());
    } else {
        console.log("No message selected...")
    }
});
constants.bot.login(constants.botsettings.token);