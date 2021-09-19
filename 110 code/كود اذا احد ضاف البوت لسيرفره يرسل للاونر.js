client.on('guildCreate', guild => {
    

    var star = new Discord.RichEmbed()
    .setTitle("DarknessBot")
    .setColor(000000)
    .setDescription(`***دخلت عند دلخ***`)                      
              .setFooter(`DarknessBot`, 'https://cdn.discordapp.com/attachments/387286451034783744/388013469275914240/thesilent_1x.jpg')
        guild.owner.send(star)
  })