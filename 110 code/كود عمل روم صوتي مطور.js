client.on("message", (message) => {
    if (message.content.startsWith("-cvoice")) {
                if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
            let args = message.content.split(" ").slice(1);
        message.guild.createChannel(args.join(' '), 'voice');
                  message.channel.send('__**Done ✅**__')                
    }
    });