exports.run = async (client, message, args) => {
      var bot_id = args[0];
      var token = args[1];
      var ownerid = args[2];
      var guildid = args[3];
      var enddate = args[4];
    if(!bot_id || !token || !ownerid || !guildid || !enddate ) {
        message.reply(' يجب تكملة الخانات !')
    } else {
var date = new Date();
if(enddate.endsWith('d')) {
    date.setDate(date.getDay() + parseInt(args[4]))
  //  ssql.query(`INSERT INTO premium (botid, token, ownerid, guild, enddate) VALUES (${bot_id}, "${token}", ${ownerid}, ${guildid}, "${date}")`)
    ssql.query(`INSERT INTO premium (botid, token, ownerid, guild, enddate, creator) VALUES (?,?,?,?,?, ?)`, [bot_id, token, ownerid, guildid, date, message.author.id], function (error, results, fields) {
        if (error) throw error;
 message.channel.send(`**رابط البوت : https://discordapp.com/oauth2/authorize?client_id=${results[0].bot_id}&scope=bot&permissions=2080374975 \n - شكرا لاختيارك بلان بوت** `)

    });

}
if(enddate.endsWith('m')) {
date.setMonth(date.getMonth() + parseInt(args[4]))
ssql.query(`INSERT INTO premium (botid, token, ownerid, guild, enddate, creator) VALUES (?,?,?,?,?, ?)`, [bot_id, token, ownerid, guildid, date, message.author.id], function (error, results, fields) {
    if (error) throw error;
    message.channel.send(`**رابط البوت : https://discordapp.com/oauth2/authorize?client_id=${results[0].bot_id}&scope=bot&permissions=2080374975 \n - شكرا لاختيارك بلان بوت** `)
});
}
if(enddate.endsWith('y')) {
    date.setFullYear(date.getFullYear() + parseInt(args[4]))
    ssql.query(`INSERT INTO premium (botid, token, ownerid, guild, enddate, creator) VALUES (?,?,?,?,?, ?)`, [bot_id, token, ownerid, guildid, date, message.author.id], function (error, results, fields) {
        if (error) throw error;
        message.channel.send(`**رابط البوت : https://discordapp.com/oauth2/authorize?client_id=${results[0].bot_id}&scope=bot&permissions=2080374975 \n - شكرا لاختيارك بلان بوت** `)
    });
        }
}
    }
        
        
        
        exports.settings = {
            "name": "newpro",
            "sub-names": [],
            "premium": false,
            "server": false,
            "owneronly": true,
            "permissions": [  ],
            "perMsg": "",
            "description": "لـ تفعيل مشترك جديد",
            "group": 3
        }  