client.on('message', message => {
    var prefix = "#"
    if (message.content === prefix + 'createText') {
        if(!message.channel.guild) return message.channel.send('**This Command Only For Servers !**')
                if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`**${message.author.username} You Dont Have** ``MANAGE_CHANNELS`` **Premission**`);
         message.guild.createChannel('اسم الروم الكتابي', 'text')
         message.guild.createChannel('اسم الروم الصوتي', 'voice')
    
    message.channel.sendMessage('**Text Channel Was Succsesfluy Created**')
    }
    });