client.on('message', message => {
    const responses = [
    'yes', 'no', 'خليك في حالك', 'شفلك كلبه', 'sure', 'ask me later', 'Fuck you','شكرا'
    ]
        if(message.content.startsWith(prefix + 'question')) {
                if(!message.channel.guild) return;
            let args = message.content.split(" ").slice(1);
            if (!args[0]) {
                message.channel.send('**Please type Your question!**');
                return;
                }
       message.channel.sendMessage(`${responses[Math.floor(Math.random() * responses.length)]}`);
                   if (!args[0]) {
              message.edit('1')
              return;
            }
        }
    });