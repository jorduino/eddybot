let Algebrite = require('algebrite');

module.exports = {
    name: 'solvec',
    description: 'Uses algebrite CAS to solve an expression, returns transparent image of result.',
    args: true,
    usage: "<expression> ...\nFor information, visit http://algebrite.org/docs/latest-stable/reference.html",
    aliases: ['solveclear','solvetransparent','solvetrans', 'solvet', 'solvec', 'st', 'sc'],
    cooldown:0,
    execute(message, args) {
        let expression = args.join(' ');
        let evaluation = Algebrite.run(`printlatex(${expression})`);

        let clnEval = evaluation.replace(/ /g, "&space;")

        message.channel.send(`https://latex.codecogs.com/png.latex?\\huge&space;${clnEval}`);
    }
}