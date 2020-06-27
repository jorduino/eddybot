let Algebrite = require('algebrite');

module.exports = {
    name: 'solvew',
    description: 'Uses algebrite CAS to solve an expression, returns light bg image of result',
    args: true,
    usage: "<expression> ...\nFor information, visit http://algebrite.org/docs/latest-stable/reference.html",
    aliases: ['solvewhite', 'solvelight', 'solvel',  'sl', 'sw'],
    cooldown:0,
    execute(message, args) {
        let expression = args.join(' ');
        let evaluation = Algebrite.run(`printlatex(${expression})`);

        let clnEval = evaluation.replace(/ /g, "&space;")

        message.channel.send(`https://latex.codecogs.com/png.latex?\\bg_white&space;\\huge&space;${clnEval}`);
    }
}