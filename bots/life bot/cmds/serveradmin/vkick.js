exports.run = async (client, message, args) => {

    var member;
    if(message.mentions.members.first( )) {
        member = message.mentions.members.first( );
    }
    if(!member) return;
    if(member.voiceChannel) {
        if(member.id === message.author.id) return message.channel.send(":exclamation: **  لا يمكنك اعطأء نفسك كيك  **");
        if(!member.highestRole.position >= message.member.highestRole.position && message.author.id == message.guild.ownerID)  {
            message.guild.createChannel("kick_" + Math.floor(Math.random() * 770000000), 'voice')
        .then(channel => {
        let timeout = setTimeout(()=> {
        message.channel.send(`**:white_check_mark: ${member} kicked from the channel! **`)
        var result = sql.query(`SELECT * FROM logs WHERE guildid = ${message.guild.id}`)
        var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${message.guild.id}`)
        if(result.length) {
        if(result[0].vkick == 1) { 
            var channel2 = client.channels.get(result[0].chat)
            if(chat[0].move !== 0) {
                channel2 = client.channels.get(chat[0].vkick)
            }
            if(!channel2) return;
           if(result[0].author == 1) {
            const embed = new discord.RichEmbed()
            .setAuthor(member.displayName + `#${member.user.discriminator}`,member.user.displayAvatarURL)
            .setDescription(':microphone2: ' + member + ' **kicked from ``' + member.voiceChannel.name + ' `` by **' + message.author)
            .setColor('#00FF00')
            .setFooter(member.displayName + `#${member.user.discriminator}`,member.user.displayAvatarURL)
        
            .setTimestamp();
            channel2.send(embed)
           }
        }
    
        }
        message.mentions.members.first().setVoiceChannel(channel.id)
        channel.delete();
        }, 100);
        })
        } else {
            message.channel.send("**لايمكنك سحبه لانه اعلى منك او بنفس الرول**!");

        }
    }
}



exports.settings = {
    "name": "vkick",
    "sub-names": [],
    "server": true,
    "owneronly": false,
    "premium": false,
    "permissions": [ "MANAGE_CHANNELS" ],
    "perMsg": "",
    "description": "لـ طرد شخص من الفويس. ",
    "group": 1
}  