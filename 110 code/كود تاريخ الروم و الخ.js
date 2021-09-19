client.on('message', message => {
    if (message.content === prefix +"channelinfo") {
                 if(!message.channel.guild) return message.reply('✖ . لا يمكنك استعمال هذا الأمر في الخاص ');

   const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField(':arrow_right_hook:  | اسم الروم',`**[-` + `${message.channel.name}]**`, true)
    .addField(':id:  | الرقم الشخصي للروم',`**[${message.channel.id}]**`, true)
    .addField(':date: | تاريخ انشاء الروم', `**[${message.channel.createdAt}]**`, true)

     message.channel.send({embed});
    }
   });