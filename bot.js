//variable declaration
const constants = require("./constants.js");

let msgLeft = parseInt(constants.random(1, 500));
let recentMessage = "";

parseMessage = async(message, oldMessage) => {
    try {
        recentMessage = constants.receivedMsg(message, oldMessage);
        if (message.author.bot) return;
        //separates the message into more useable parts
        let messageArray = message.content.split(" ")
        let command = messageArray[0];
        let args = messageArray.slice(1);
        let consoleInfo = "";

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
                } else if (args[0].toUpperCase() == "SOLVE") {
                    let expression = args.slice(1).join(' ');
                    message.channel.send('```\n' + constants.Algebrite.run('print2dascii(' + expression + ')') + '\n```');
                } else if (args[0].toUpperCase() == "SOLVERAW") {
                    let expression = args.slice(1).join(' ');
                    message.channel.send('```\n' + constants.Algebrite.run(expression) + '\n```');
                } else if (args[0].toUpperCase() == "FIGLET") {
                    let words = "";
                    for (let string of args.slice(1)) {
                        words += string + " "
                    }
                    constants.Figlet(words, function(err, data) {
                        if (err) {
                            consoleInfo += "error get:\n" + err;
                            return;
                        }
                        message.channel.send("```\n" + data + "\n```");
                    });
                } else {
                    message.channel.send("um... what?");
                }
            } else {
                message.channel.send("Yes...?");
            }
        }

        constants.findWords(message);

        if (command.toUpperCase() == "RIP" && args.length > 0) {
            constants.rip(message, args)
        }
        constants.checkMessagesLeft(message, msgLeft);
    } catch (err) {
        //something went wrong
        constants.debug.send("error: " + err);
        try {
            if (message.author.bot) {
                return;
            } else {
                message.channel.send("lemme think on that");
            }
        } catch (err2) {
            constants.debug.send("another error: " + err + "\n and \n" + err2);
        }
    }
};


let stdin = process.openStdin();

stdin.addListener("data", function(d) {
    if (recentMessage != "") {
        recentMessage.channel.send(d.toString().trim());
    } else {
        constants.debug.send("No message selected..." + recentMessage);
    }
});

constants.bot.on("ready", async() => {
        //prints eddy's name in large ascii
        console.clear();
        constants.Figlet(constants.bot.user.username, function(err, data) {
            if (err) {
                constants.debug.send(constants.bot.user.username.toUpperCase());
                console.dir(err);
                return;
            }
            constants.debug.send(data);
            constants.debug.send("Bot is ready");
        });
    })
    .on("messageUpdate", parseMessage)
    .on("message", parseMessage)
    .on('disconnect', function(erMsg, code) {
        constants.debug.send('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
        bot.connect();
    })
    .login(constants.botsettings.token);