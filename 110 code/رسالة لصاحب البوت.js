client.on('message', message => {
  
    if(message.content.split(' ')[0] == 'jkjk'){
         if(!message.channel.guild) return;
                            let args = message.content.split(' ').slice(1).join(' ');
    
    client.guilds.get("ايدي السيرفر").members.get("ايديك انت").sendMessage(message.author.tag+"\n Message : "+args)
    
                                                    let embed = new Discord.RichEmbed()
                                                    .setAuthor(message.author.username, message.author.avatarURL)
                                                    .setDescription(':mailbox_with_mail: تم ارسال صاحب البوت بنجاح')
                                                    .setThumbnail(message.author.avatarURL)
                                                    .setFooter(message.author.username, message.author.avatarURL)
                                                    message.channel.sendEmbed(embed);}
                                                  });