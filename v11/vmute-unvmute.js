client.on("message", message => {
    if(message.content.startsWith(prefix + "vmute")) {
    var mnt = message.mentions.members.first();
    if(message.author.bot || message.channel.type == "dm" || !message.member.hasPermission("MUTE_MEMBERS") || !message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return;
    if(!mnt) return message.channel.send(`**• | Usage:** ${prefix}vmute \`\`@Name\`\``);
    if(!mnt.voiceChannel) return message.channel.send(`? | *${mnt.user.tag}* is not in a voice channel!`);
    mnt.setMute(true).then(() => {
    message.channel.send(`Successfully Muted ${mnt} :+1:`)
    }).catch(console.error);
    }
    if(message.content.startsWith(prefix + "unvmute")) {
    var mnt = message.mentions.members.first();
    if(message.author.bot || message.channel.type == "dm" || !message.member.hasPermission("MUTE_MEMBERS") || !message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return;
    if(!mnt) return message.channel.send(`**• | Usage:** ${prefix}unvmute \`\`@Name\`\``);
    if(!mnt.voiceChannel) return message.channel.send(`? | *${mnt.user.tag}* is not in a voice channel!`);
    mnt.setMute(false).then(() => {
    message.channel.send(`Successfully Unmuted ${mnt} :+1:`)
    }).catch(console.error);
    }
    });
