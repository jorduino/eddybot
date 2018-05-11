//variable declaration
const constants = require("./constants.js");

let msgLeft = parseInt(constants.random(1, 500));
let recentMessage = "";



//function that executes when the bot turns on

constants.bot.on("ready", async () => {
  console.log(constants.HR);
  //prints bot's name in large ascii
  constants.figlet(constants.bot.user.username, function(err, data) {
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
  let consoleInfo="";
  console.log(constants.CR[0]);
  console.log("    command: " + command + "\n    args: " + args);
  if (command.toUpperCase() == 'EDDYBOT') { //"eddybot" commands:
    console.log("    command found: eddybot");
    if (args.length > 0) {
      if (args[0].toUpperCase() == "HELP") {

        if (args.length == 1) { //"eddybot help":
          console.log("    command found: help");

          message.channel.send('I am eddybot. Current commands:\n' + constants.commands());
        } else { //"eddybot help ...":
          console.log("    command found: help...");

          let output = "";
          for (let i = 1; i < args.length; i++) {
            output += args[i] + " ";
          } //end for
          message.channel.send("Nothing to be done for `" + output + "`");
        } //end if
      } else if (args.length == 2 && args[0].toUpperCase() == "MESSAGES") { //"eddybot messages":
        console.log("    command found: messages");

        msgLeft = parseInt(args[1]);
      } else if (message.content.toUpperCase().includes(" OR ")) { //"eddybot ... or ...":
        console.log("    command found: ...or...");

        message.channel.send(message.content.split(" ")[(Math.random() >= .5 ? message.content.toUpperCase().split(" ").indexOf("OR") - 1 : message.content.toUpperCase().split(" ").indexOf("OR") + 1)]);
      } else if (args[0].toUpperCase() == "SOLVE") {
        console.log("    command found: solve");

        if (args[1].toUpperCase() == "QUADRATIC") {
          console.log("    command found: quadratic");

          let equation = args[2];
          let a = parseInt(equation.slice(0, equation.indexOf("x^2")));
          equation = equation.slice(equation.indexOf("x^2") + 3)
          let b = parseInt(equation.slice(0, equation.indexOf("x")));
          equation = equation.slice(equation.indexOf("x") + 1);
          let c = parseInt(equation.slice(0));
          if (!(a && b && c)) {
            message.channel.send("nan");
          } else {
            message.channel.send("x= " + constants.quad(a, b, c, 1) + "\nx= " + constants.quad(a, b, c, -1));
          }
        }
      } else if (args[0].toUpperCase() == "FIGLET") {
        console.log("    command found: figlet");
        let words = "";
        for (let string of args.slice(1)) {
          words += string + " "
        }
        constants.figlet(words, function(err, data) {
          if (err) {
            consoleInfo+="error get:\n"+err;
            return;
          }
          message.channel.send("```\n" + data + "\n```");
        });
      }
    }
  }

  constants.findWords(message);

  if (command.toUpperCase() == "RIP" && args.length > 0) {
    console.log("    command found: RIP");
    constants.rip(message, args)
  }
console.log(constants.CR[1]);
  constants.checkMessagesLeft(message, msgLeft);
});


let stdin = process.openStdin();

stdin.addListener("data", function(d) {
  if (recentMessage != "") {
    recentMessage.channel.send(d.toString().trim());
  } else {
    console.log("No message selected...")
  }
});

constants.bot.on('disconnect', function(erMsg, code) {
    console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
    bot.connect();
});
constants.bot.login(constants.botsettings.token);
