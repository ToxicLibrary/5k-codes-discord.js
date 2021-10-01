var filterInt = function(value) {
    if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
      return Number(value);
    return NaN;
  }
  
exports.run = async (client, message, args, cmd) => {
if(cmd == "points") {
    var r = sql.query(`SELECT * FROM points WHERE guild = ${message.guild.id} ORDER BY points DESC `);
    if(!r.length) {
        let embed = new discord.RichEmbed()
        .addField('** 📋 Point list **', ' لايوجد ')
        .setColor( "BLACK" )
        .setFooter(  message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
      message.channel.send({embed})
    } else {
        let embed = new discord.RichEmbed()
        var msg = " ";
        for (let i = 0; i < r.length; i++) {
            msg += `**${i + 1} - <@${r[i].id}> | ${r[i].points} **\n`
        
        }
        embed.addField('** 📋 Point list **', msg)
        embed.setColor( "BLACK" )
        embed.setFooter(  message.member.displayName, message.author.displayAvatarURL)
        embed.setTimestamp()
        message.channel.send({embed})  
    }
} 
if(cmd == "point") { 
if(message.mentions.users.first() ) {

var memberinsql = sql.query(`SELECT * FROM points WHERE guild = ${message.guild.id} AND id = ${message.mentions.users.first().id}`);
if(!memberinsql.length) {
sql.query(`INSERT INTO points (id, guild, points) VALUES ( ${message.mentions.users.first().id}, ${message.guild.id}, 0 )`)
memberinsql = sql.query(`SELECT * FROM points WHERE guild = ${message.guild.id} AND id = ${message.mentions.users.first().id}`);
}
if(args[1] == 0) {
    message.channel.send(`**${message.mentions.users.first()} Points removed :white_check_mark:**`); 
    ssql.query("DELETE FROM points WHERE guild = ? AND id = ?", [message.guild.id, message.mentions.users.first().id], function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    })
}
if(args[1].startsWith('+')) {
message.channel.send(`**${message.mentions.users.first()} Points added +${parseInt(args[1])} :white_check_mark:**`);
sql.query(`UPDATE points SET points = ${parseInt(memberinsql[0].points + parseInt(args[1]))} WHERE guild = ${message.guild.id} AND id = ${message.mentions.users.first().id}`)
}
if(args[1].startsWith('-')) {
    message.channel.send(`**${message.mentions.users.first()} Points removed ${parseInt(args[1])} :white_check_mark:**`);
    sql.query(`UPDATE points SET points = ${memberinsql[0].points + args[1]} WHERE guild = ${message.guild.id} AND id = ${message.mentions.users.first().id}`)
}
}
}

}
   
   

   exports.settings = {
       "name": "points",
       "sub-names": [  "point" ],
       "server": false,
       "premium": false,
       "owneronly": false,
       "permissions": [ "MANAGE_MESSAGES" ],
       "perMsg": "",
       "description": "لـ عرض سرعة اتصال البوت ",
       "group": 2
   }  