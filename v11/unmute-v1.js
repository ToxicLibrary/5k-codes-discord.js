
client.on('message', message => {//Gaber
if(message.content.startsWith(prefix + 'unmute')){//Gaber
    let role = message.guild.roles.find(r => r.name === 'Muted');//Gaber
if(!user.roles.has(role)) {
    return message.channel.send(`He is not muted`);//Gaber
}
    user.removeRole(role).then(message.channel.send(`Unmuted ${user}`));
   
}
});
