let Algebrite = require('algebrite');

module.exports = {
    name: 'solve',
    description: 'Uses algebrite CAS to solve an expression',
    args: true,
    usage: "<expression> ...\nFor information, visit http://algebrite.org/docs/latest-stable/reference.html",
    execute(message, args) {
        let expression = args.join(' ');
        message.channel.send('```\n' + Algebrite.run(expression) + '\n```');
        console.log("expression:" + expression + "\nargs:" + args)
    }
}