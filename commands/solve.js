let Algebrite = require('algebrite');

module.exports = {
    name: 'solve',
    description: 'Uses algebrite CAS to solve an expression, returns dark bg image of result',
    args: true,
    usage: "<expression> ...\nFor information, visit http://algebrite.org/docs/latest-stable/reference.html",
    aliases: ['solveBlack', 'solveB', 'solveDark', 'solveD', 's', 'sd', 'sb'],
    cooldown:0,
    execute(message, args) {
        let expression = args.join(' ');
        let evaluation = Algebrite.run(`printlatex(${expression})`);

        let clnEval = evaluation.replace(/ /g, "&space;")

        message.channel.send(`https://latex.codecogs.com/png.latex?\\bg_black&space;\\huge&space;${clnEval}`);
    }
}