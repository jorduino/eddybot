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
module.exports = {
    botsettings: require("../../GitHub private/botsettings.json"),
    figlet: require("figlet"),
    HR: "\n-----------------------------------------------\n",
    slutWords: ["salad", "visual studio", "sluts", "visual studio code", "python", "javascript"],
    searchWords: [
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
    ],
    bot: new Discord.Client({
        disableEveryone: true
    }),
    random: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    commands: function () {
        let output = "";
        for (command of strCommands) {
            output += "`" + command + "`" + "\n";
        }
        return output;
    }
}