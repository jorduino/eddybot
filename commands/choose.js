module.exports = {
    name: 'choose',
    description: 'Chooses between two given items',
    args:true,
    usage:"<option1> <option2>",
    execute(message, args) {
        message.channel.send(args[(Math.random() >= .5) ? 0 : 1])
    }
}