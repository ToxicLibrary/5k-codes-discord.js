exports.run = async (client, message) => {
    if(!message.guild.me.hasPermission( 'MOVE_MEMBERS' )) return;
    const args = message.content.split(/\s+/g);
    let member = message.mentions.members.first( );
    if(!message.guild.members.get(message.author.id).voiceChannel) return message.channel.send(`**:x:  You must be in voice channel ! **`);
   if(args[1] == member) { 
     if(!member) return message.channel.send(`**:x:  لم يتم العثور على العضو المطلوب **`);
        if(!member.highestRole.position >= message.member.highestRole.position && message.author.id == message.guild.ownerID)  {
    if(!member.voiceChannel) return message.channel.send('**:x:  العضو يجب أن يكون متواجد بروم صوتي **');
    if(args[2]) {
        var channel_name = message.content.replace(getResult(message.guild.id) + "move " + member, "")
        var c = message.guild.channels.find(c => c.name == channel_name.slice(1) && c.type == "voice");
        if(!c) return message.reply('** :x: لم يتم ايجاد الروم ** ')
        var old_channel = member.voiceChannel.name;
if(c.memberPermissions(message.author).has("CONNECT")) {
    member.setVoiceChannel(c.id)
    var result = sql.query(`SELECT * FROM logs WHERE guildid = ${message.guild.id}`)
         var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${message.guild.id}`)
         if(result.length) {
         if(result[0].move == 1) { 
             var channel2 = client.channels.get(result[0].chat)
             if(chat[0].move !== 0) {
                 channel2 = client.channels.get(chat[0].vkick)
             }
             if(!channel2) return;
            if(result[0].author == 1) {
             const embed = new discord.RichEmbed()
             .setAuthor(member.displayName + `#${member.user.discriminator}`,member.user.displayAvatarURL)
             .setDescription(':microphone2: ' + member + ' **Moved from ``' + old_channel + ' `` to ``' + c.name +'`` by  **' + message.author)
             .setColor('#00FF00')
             .setFooter(member.displayName + `#${member.user.discriminator}`,member.user.displayAvatarURL)
         
             .setTimestamp();
             channel2.send(embed)
            }
         }
        }

} 
    }
}
    if(!args[2]) {
        if(message.guild.channels.get(message.guild.members.get(message.author.id).voiceChannelID).memberPermissions(message.author).has("CONNECT")) {
                    member.setVoiceChannel(message.guild.members.get(message.author.id).voiceChannelID)
        } 
    }
   }
    if(message.author.id !== message.guild.ownerID) return;

    if(args[1] == "all") {
        if(args[2]) { 
            var channel_name = message.content.replace(getResult(message.guild.id) + "move all", "")
            var c = message.guild.channels.find(c => c.name == channel_name.slice(1) && c.type == "voice");
            if(c == null) return message.reply('** :x: لم يتم ايجاد الروم ** ');
            if(c.memberPermissions(message.author).has("CONNECT")) {
                message.guild.channels.forEach(r => {
                    if(r.type !== "voice") return;
                    r.members.forEach(m => {
                  m.setVoiceChannel(c.id);
                    })
                })
                   } else {
           message.channel.send('**:x: لاتملك صلاحية بهذا الروم **');
       }
   
    } else {
        if(client.channels.get(message.guild.members.get(message.author.id).voiceChannelID).memberPermissions(message.author).has("CONNECT")) {
            message.guild.channels.forEach(c => {
                if(c.type !== "voice") return;
                c.members.forEach(m => {
                    if(result.length) {
                        if(result[0].move == 1) { 
                            var channel2 = client.channels.get(result[0].chat)
                            if(chat[0].move !== 0) {
                                channel2 = client.channels.get(chat[0].vkick)
                            }
                            if(!channel2) return;
                           if(result[0].author == 1) {
                            const embed = new discord.RichEmbed()
                            .setAuthor(member.displayName + `#${member.user.discriminator}`,member.user.displayAvatarURL)
                            .setDescription(':microphone2: ' +  message.author + ' **Moved all memebrs to ``' + message.guild.channels.get(message.guild.members.get(message.author.id).voiceChannelID).name +'``')
                            .setColor('#00FF00')
                            .setFooter(member.displayName + `#${member.user.discriminator}`,member.user.displayAvatarURL)
                        
                            .setTimestamp();
                            channel2.send(embed)
                           }
                        }
                       }
              m.setVoiceChannel(message.guild.members.get(message.author.id).voiceChannelID);
                })
            })
               } 
    }
}
}



exports.settings = {
    "name": "move",
    "sub-names": [],
    "server": true,
    "owneronly": false,
    "premium": false,
    "permissions": [ "MANAGE_CHANNELS" ],
    "perMsg": "",
    "description": "لــ السحب اشخاص / الكل بالفويس. ",
    "group": 1
}  