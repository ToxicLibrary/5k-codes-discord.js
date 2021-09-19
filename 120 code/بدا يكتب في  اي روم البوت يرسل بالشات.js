client.on('typingStart',(channel, user) =>{  
    if (!channel) return; 
  let embed = new Discord.RichEmbed()
      .setColor('RED')
      .addField(':speaking_head: ',`**[ ${user.username} has start tayping ${channel.name} ]**`,true)
      channel.send(``)
    channel.send({embed:embed});
  });
