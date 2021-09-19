client.on("message", (message) => {
    if (message.content.startsWith("-ctext")) {
                if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
            let args = message.content.split(" ").slice(1);
        message.guild.createChannel(args.join(' '), 'text');
                  message.channel.send('__**Done ✅**__')            
    }
    });