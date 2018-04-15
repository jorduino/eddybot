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
            console.log(constants.bot.user.username.toUpperCase());
            console.dir(err);
            return;
        }
        console.log(data);
        console.log("Bot is ready");
    });
});



//function that executes once a message is sent
constants.bot.on("message", async message => {
    //ignores messages that the bot sends and that are DM'ed
    if (message.author.bot || message.channel.type === "dm") return

    recentMessage = message;

    //console logs what the message was and who said it on which channel
    constants.printMsg(message);
    //seperates the message into more useable parts		
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (command.toUpperCase() == 'EDDYBOT') { //"eddybot" commands:
        if (args.length > 0) {
            if (args[0].toUpperCase() == "HELP") {
                if (args.length == 1) { //"eddybot help":
                    message.channel.send('I am eddybot. Current commands:\n' + constants.commands());
                } else { //"eddybot help ...":
                    let output = "";
                    for (let i = 1; i < args.length; i++) {
                        output += args[i] + " ";
                    } //end for
                    message.channel.send("Nothing to be done for `" + output + "`");
                } //end if
            } else if (args.length == 2 && args[0].toUpperCase() == "MESSAGES") { //"eddybot messages":
                msgLeft = parseInt(args[1]);
            } else if (message.content.toUpperCase().includes(" OR ")) { //"eddybot ... or ...":
                message.channel.send(message.content.split(" ")[(Math.random() >= .5 ? message.content.toUpperCase().split(" ").indexOf("OR") - 1 : message.content.toUpperCase().split(" ").indexOf("OR") + 1)]);
            }
        }
    }

    constants.findWords(message);

    if (command.toUpperCase() == "RIP" && args.length > 0) {
        constants.rip(message, args)
    }

    constants.checkMessagesLeft(message, msgLeft);
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