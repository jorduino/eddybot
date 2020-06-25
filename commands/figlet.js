let Figlet = require("figlet");

module.exports = {
    name: 'figlet',
    description: 'Prints messages with big characters',
    args:true,
    execute(message, args) {
        let words = args.join(" ")
        Figlet(words, function (err, data) {
            if (err) {
                consoleInfo += "error get:\n" + err;
                return;
            }
            message.channel.send("```\n" + data + "\n```");
        });
    }
}