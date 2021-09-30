client.on('voiceStateUpdate', async (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;
    var tchannel = client.channels.get('469209727688114198');
    var vchannel = client.channels.get('469209727688114200');
    var guild = client.guilds.get('469209727688114196');
    var role = guild.roles.find("name", "[-] Now Listening");
    if (oldUserChannel === undefined && newUserChannel !== undefined) {

        if (newUserChannel === vchannel) {
            tchannel.send(newMember.displayName + ' has joined the show and has recieved the `Now Listening` role!');
            await (newMember.addRole(role))

            console.log(`ADDED`)
        }
    } else if (newUserChannel === undefined) {
        tchannel.send(oldMember.displayName + ' has left the show and has now been removed from the `Now Listening` list!');
        await (newMember.removeRole(role))
    }
});