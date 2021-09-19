client.on('message', message => {
    var prefix = "."
    if (message.content === prefix + 'server') {
        if(!message.channel.guild) return message.channel.send('**This Command Only For Servers !**')
                if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`**${message.author.username} You Dont Have** ``MANAGE_CHANNELS`` **Premission**`);
         message.guild.createChannel('info', 'text')
		 message.guild.createChannel('news', 'text')
		 message.guild.createChannel('giveaways', 'text')
		 message.guild.createChannel('invite-reward', 'text')
    
    message.channel.sendMessage('**Rooms Group 1 Complete**')
    }
    });