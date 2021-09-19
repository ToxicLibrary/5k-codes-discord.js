client.on('message', message => {
    if (message.content.startsWith(".avatar")) {
if(!message.channel.guild) return;

        var mentionned = message.mentions.users.first();

    var client;
      if(mentionned){
          var client = mentionned;
      } else {
          var client = message.author;

      }

        const embed = new Discord.RichEmbed()
                           .addField('Requested by:', "<@" + message.author.id + ">")

        .setColor(000000)
        .setFooter(اسم بوتك, 'ur bot image link')
        .setImage(${client.avatarURL})
      message.channel.sendEmbed(embed);
    }
});