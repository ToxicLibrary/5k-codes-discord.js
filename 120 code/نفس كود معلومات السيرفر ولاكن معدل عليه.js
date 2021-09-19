client.on('message', message => {

    if (message.content === "$ser") {
var year = message.guild.createdAt.getFullYear()
var month = message.guild.createdAt.getMonth()
var day = message.guild.createdAt.getDate()
    let embed = new Discord.RichEmbed()

.addField('***SERVER OWNER👑***: ' , message.guild.owner)
.addField('***SERVER NAME💳***: ' , message.guild.name)
.addField('***SERVER ID🆔***:' , message.guild.id)
.addField('***SERVER VERIFICATIONLEVEL❓***: ' , message.guild.verificationLevel)
.addField('***SERVER REGION:globe_with_meridians: ***: ' , message.guild.region)
.addField('***DEFAULT CHANNEL1⃣ ***: ' , message.guild.defaultChannel)
.addField('***CHANNELS SIZE🔋***: ' , message.guild.channels.size)
.addField('***ROLES🔢***: ' , message.guild.roles.size)
.addField('***MEMBERS📡***: ' , message.guild.memberCount)
.addField('**SERVER CREATED IN🕑***: ' ,year + "-"+ month +"-"+ day)
.setColor("#51cde6")
.setDescription(`${message.guild.name}`)
     message.channel.sendEmbed(embed);
} 

});