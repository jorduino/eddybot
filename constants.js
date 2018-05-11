let everyoneLink = "http://i0.kym-cdn.com/photos/images/facebook/001/291/661/4cf.jpg"
let Discord = require("discord.js");
let strCommands = [
  "eddybot help",
  "eddybot messages <msgleft>",
  "eddybot ... <something> or <something> ...",
  "eddybot figlet <message>",
  "a few secret commands (i.e. your mom gay, salad, etc)",
  "rip <person> <born> <died> (default: born=420, died=6969)"
]
let slutWords = ["salad", "visual studio", "sluts", "visual studio code", "python", "javascript"];
let searchWords = [
  [
    ["@EVERYONE"],
    [everyoneLink]
  ],
  [
    ["NO U ^∞"],
    [":b:oof"]
  ],
  [
    ["NO U ^", "NO U^"],
    ["No u ^∞"]
  ],

  [
    ["NO U"],
    ["No u ^2"]
  ],
  [
    ["YOUR MOM GAY", "UR MOM GAY"],
    ["ur dad lesbian"]
  ],
  [
    ["YOUR DAD LESBIAN", "UR DAD LESBIAN"],
    ["ur sister a mister"]
  ],
  [
    ["YOUR SISTER A MISTER", "UR SISTER A MISTER"],
    ["ur brother a mother"]
  ],
  [
    ["YOUR BROTHER A MOTHER", "UR BROTHER A MOTHER"],
    ["ur grandpap a trap"]
  ],
  [
    ["YOUR GRANDPAP A TRAP", "UR GRANPAP A TRAP"],
    ["ur granny a tranny"]
  ],
  [
    ["YOUR GRANNY A TRANNY", "UR GRANNY A TRANNY"],
    ["ur ancestors incestors"]
  ],
  [
    ["YOUR ANCESTORS INCESTORS", "UR ANCESTORS INCESTORS"],
    ["ur family tree LGBT"]
  ],
  [
    ["YOUR FAMILY TREE LGBT", "UR FAMILY TREE LGBT"],
    ["*dies*"]
  ]
];
let botsettings = require("../../GitHub private/botsettings.json");
let figlet = require("figlet");
let HR = "\n-----------------------------------------------\n";
let CR = [
  "\n/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\\n|                                              |",
  "|                                              |\n\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\n"
];
let bot = new Discord.Client({
  disableEveryone: true
});
let random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let commands = function() {
  let output = "";
  for (command of strCommands) {
    output += "`" + command + "`" + "\n";
  }
  return output;
};
let findWords = function(message) {
  //initializes variable to hold trigger
  //words found in the message recieved
  let words = "";

  //used for comma placement
  let first = true;

  for (word of slutWords) {
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

  for (array of searchWords) {
    for (word of array[0]) {
      if (message.content.toUpperCase().includes(word)) {
        message.channel.send(array[1]);
        return;
      }

    }
  }
};
let printMsg = function(message) {
  console.log(
    HR +
    "|" + message.author.username + ' said :' +
    '\n|' +
    '\n| "' + message.content + '"' +
    '\n|' +
    '\n| on ' + message.channel.name +
    HR
  );
};
let rip = function(message, args) {
  message.channel.send("Here lies " + args[0] + "\nThey will be missed\n" + ((args.length == 3) ? ("Born:" + args[1] + "\nDied:" + args[2]) : ("Born:420\nDied:6969")));
};
let checkMessagesLeft = function(message, msgLeft) {
  if (msgLeft <= 0) {
    msgLeft = parseInt(random(1, 500));
    message.channel.send("I eat ass");
  } else {
    msgLeft--;
  }
}
let quad = function(a, b, c, operater) {
  return ((-b + operater * Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a));
}
module.exports = {
  everyoneLink,
  Discord,
  strCommands,
  slutWords,
  searchWords,
  botsettings,
  figlet,
  HR,
  CR,
  bot,
  random,
  commands,
  findWords,
  printMsg,
  rip,
  checkMessagesLeft,
  quad
}
