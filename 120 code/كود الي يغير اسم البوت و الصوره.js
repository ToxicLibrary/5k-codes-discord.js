client.on('message', message => {
    var prefix = "$";
      if (!message.content.startsWith(prefix)) return;
      var args = message.content.split(' ').slice(1);
      var argresult = args.join(' ');
      if (message.author.id == 410052613996937217) return;
    
    if (message.content.startsWith(prefix + 'playing')) {
      client.user.setGame(argresult);
        message.channel.sendMessage(`**${argresult}** : Status changed`)
    } else
    
    if (message.content.startsWith(prefix + 'Stream')) {
      client.user.setGame(argresult, "https://www.twitch.tv/ChampionBot");
        message.channel.sendMessage(`**${argresult}** :The bot stream has been changed`)
    } else
    
    if (message.content.startsWith(prefix + 'name')) {
      client.user.setUsername(argresult).then
          message.channel.sendMessage(`**${argresult}** : Name changed`)
      return message.reply("**You**");
    } else
    if (message.content.startsWith(prefix + 'image')) {
      client.user.setAvatar(argresult);
        message.channel.sendMessage(`**${argresult}** : The bot image has been changed`);
    
    }
    });