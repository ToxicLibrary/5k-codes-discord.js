client.on('message', message => {
    if (message.content.includes('disc ord.gg')){      //شيل المسافه
                        if(!message.channel.guild) return message.reply ('')
                    if (!message.member.hasPermissions(['MANAGE_MESSAGES'])){
       message.channel.send('kick <@' + message.author.id + '>')
       message.delete() 
       }
    }
          if (message.content.startsWith("kick ")) {
             if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply();
             var member= message.mentions.members.first();
             member.ban().then((member) => {
                 message.channel.sendMessage("", {embed: {
                 author: {
                 },
                 title: 'بسبب النشر ' + member.displayName + ' تم طرد',
                 color: 490101,
                 }
               });
           }
         ) 
       }
   });