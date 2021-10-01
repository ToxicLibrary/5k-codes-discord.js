exports.run = async (client, message, args) => {
    let mm = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
     if(!mm) {
        let embed = new discord.RichEmbed()

ssql.query(`SELECT * FROM usersmute WHERE date  < ? AND type = "Text" ORDER BY date DESC LIMIT 5;`, [ new Date ( ) ], function (error, results, fields) {
if (error) throw error;
msg = " "
for (let i = 0; i < results.length; i++) {
    msg += `**#${i+1}** ${results[i].username} **By:**  ${results[i].adminname} **Reason :** ${results[i].reason|| 'لايوجد'}  **Channel :** <#${results[i].channel}> \n`

}
msg += "\n"
msg += ":sparkles: **More?**   ``#list mutes​``"
embed.addField('** Latest Users muted in text **', msg)
})
// Voice Mute
ssql.query(`SELECT * FROM usersmute WHERE date  < ?  AND type = "Voice" ORDER BY date DESC LIMIT 5;`, [ new Date ( ) ], function (error, results, fields) {
    if (error) throw error;
    msg = " "
for (let i = 0; i < results.length; i++) {
        msg += `**#${i+1}** ${results[i].username} **By:**  ${results[i].adminname} **Reason :** ${results[i].reason|| 'لايوجد'}  **Channel :** <#${results[i].channel}> \n`
}
msg += "\n"
msg += ":sparkles: **More?**   ``#list mutesv​``"
embed.addField('** Latest Users muted in voice **', msg)
})

embed.setColor( "GREEN" )
        embed.setAuthor('📋 Guild mute list', message.member.avatarURL)
        embed.setFooter(  message.member.displayName, message.author.displayAvatarURL)
        embed.setTimestamp()
    setTimeout( function ( ) { 
      message.channel.send({embed})
    }, 3000)
}
}
    
    
    
    exports.settings = {
        "name": "list",
        "sub-names": [],
        "server": true,
        "owneronly": false,
        "premium": false,

        "permissions": [ "ADMINISTRATOR" ],
        "perMsg": "",
        "description": "لـ عرض سوابق العضو ",
        "group": 1
    }  