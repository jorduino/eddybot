//#region requires
let Algebrite = require('algebrite');
let botsettings = require("./../github_private/botsettings.json");
let Colors = require('colors');
let Discord = require("discord.js");
let Figlet = require("figlet");
//#endregion

//#region copy/paste
let HR = [
    "\n┌──────────────────────────────────────────────────────\n",
    "\n└──────────────────────────────────────────────────────\n"
];
const illuminatiAscii = `\`\`\`
..  ...  ...  ...  ..      .        ..  ....  .....  .....
...  .... .... .....     .%/\\      .. ....  .....  .....  .
.  ...  ...  ... ..     .%./  &.     ....  ......  ....  ...
..  ....  ..  ...     .%**/     \\        .....  .....  ....
....  ....  ..      .%***/       &.     .....  .....  ...  .
......  .... .    .%.***/  .d99b_  \\      . ......  ... ....
 .......       .%*****/ -'      \`'.&.     .....  ... .....
..     ..     .%******/  ._."""'~::,  \\      . ... .....   .
.......     .%*******/._'\` .'"^':,  :.,&.     . ....  .....
...       .%********/',_-^{  ( )  }    :.\\       ........ ..
 ..     .%*********/%^    '.     .'     ;.&.     .  ... ....
.     .%**********/;        ".,."        ;#.\\     .  . .....
    .%***********/  ~'.,,.          ,.-'^    &.     . ... ..
  .%************/         ""-.,.-""~           \\     . . ..
.%*************/                                &.     .. ..
%**************/                                   \\     ...
\`\`\``;
//#endregion

//#region lists
let searchWords = [

    [/no u/i, "no u ^2"],
    [/no u \^/i, "no u ^∞"],
    [/no u \^∞/i, ":b:oof"],

    [/(your|ur) mom gay/i, "ur dad lesbian"],
    [/(your|ur) dad lesbian/i, "ur sister a mister"],
    [/(your|ur) sister a mister/i, "ur brother a mother"],
    [/(your|ur) brother a mother/i, "ur grandpap a trap"],
    [/(your|ur) grandpap a trap/i, "ur granny a tranny"],
    [/(your|ur) granny a tranny/i, "ur ancestors incestors"],
    [/(your|ur) ancestors incestors/i, "ur family tree lgbt"],
    [/(your|ur) family tree lgbt/i, "*dies*"],

    [/who runs the world/i, "girls"],
    [/(illuminati|^who (really|_really_|\*really\*) runs the world\?$)/i, illuminatiAscii],
    [/minecraft server/, "Did you say minecraft server? Why yes I have one! `calcium.uk.eddyn.net`!"],
];
let slutWords = ["salad", "visual studio", "sluts", "visual studio code", "python", "javascript"];
let strCommands = [
    "eddybot help",
    "eddybot messages <msgleft>",
    "eddybot ... <something> or <something> ...",
    "eddybot figlet <message>",
    "a few secret commands (i.e. your mom gay, salad, etc)",
    "rip <person> <born> <died> (default: born=420, died=6969)"
];
//#endregion

//#region functions
let bot = new Discord.Client({
    disableEveryone: true
});
let checkMessagesLeft = function(message, msgLeft) {
    if (message) {
        if (msgLeft <= 0) {
            msgLeft = parseInt(random(1, 500));
            message.channel.send("I eat ass");
        } else {
            msgLeft--;
        }
    } else {
        return;
    }
};
let commands = function() {
    let output = "";
    for (command of strCommands) {
        output += "`" + command + "`" + "\n";
    }
    return output;
};
let debug = {
    send: function(string) {
        console.log(string);
    }
};
let findWords = function(message) {
    if (message && !message.author.bot) {
        //initializes variable to hold trigger
        //words found in the message received
        let words = "";

        //used for comma placement
        let first = true;

        for (word of slutWords) {
            if (message.content.toLowerCase().includes(word)) {
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

        for (array of searchWords) {
            if (array && array.length == 2) {
                if (message.content.match(array[0])) {
                    message.channel.send(array[1]);
                    return;
                }
            }
        }
    } else {
        return;
    }
};
let printMsg = function(message, newMessage) {
    if (message && newMessage) {
        debug.send(
            HR[0].red +
            ("│" + new Date()).red +
            "\n│".red + message.author.username.blue + ' changed :' +
            '\n│'.red +
            '\n│'.red + ' "' + Colors.cyan(message.content) + '" to "' + Colors.cyan(newMessage.content) + '"' +
            '\n│'.red +
            '\n│ '.red + 'on ' + Colors.red(message.channel.name) +
            HR[1].red
        );
    } else if (message) {
        debug.send(
            HR[0].cyan +
            ("│" + new Date()).cyan +
            "\n│".cyan + Colors.blue(message.author.username) + ' said :' +
            '\n│'.cyan +
            '\n│'.cyan + ' "' + Colors.yellow(message.content) + '"' +
            '\n│'.cyan +
            '\n│'.cyan + ' on ' + Colors.red(message.channel.name) +
            HR[1].cyan
        );
    } else {
        debug.send("there was no message?".red)
    }
};
let random = function(min, max) {
    min = min || 0;
    max = max || 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
};
let receivedMsg = function(message, oldMessage) {
    if (message) {
        //console logs what the message was and who said it on which channel
        printMsg(message, oldMessage);
        //ignores messages that the bot sends and that are DM'ed
        if (message.author.bot) return

        recentMessage = message;
    } else {
        return;
    }
};
let rip = function(message, args) {
    if (message) {
        message.channel.send("Here lies " + args[0] + "\nThey will be missed\n" + ((args.length == 3) ? ("Born:" + args[1] + "\nDied:" + args[2]) : ("Born:420\nDied:6969")));
    } else {
        return;
    }
};
//#endregion

module.exports = {
    //requires
    Algebrite,
    botsettings,
    Colors,
    Discord,
    Figlet,
    //copy/paste
    HR,
    illuminatiAscii,
    //lists
    searchWords,
    slutWords,
    strCommands,
    //functions
    bot,
    checkMessagesLeft,
    commands,
    debug,
    findWords,
    printMsg,
    random,
    receivedMsg,
    rip
}