module.exports = {
    name: 'rip',
    description: 'custom tombstone',
    args:true,
    usage:"<name> [year born] [year died]",
    execute(message, args) {
        message.channel.send("Here lies " + args[0] + "\nThey will be missed\n" + ((args.length == 3) ? ("Born:" + args[1] + "\nDied:" + args[2]) : ("Born:420\nDied:6969")));

    }
}