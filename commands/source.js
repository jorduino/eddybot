module.exports={
    name: 'source',
    description:'Gives source code for eddybot',
    execute(message,args){
        message.channel.send('https://github.com/jorduino/eddybot.git')
    }
}