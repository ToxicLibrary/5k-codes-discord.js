const { Canvas } = require("canvas-constructor"); 
const fetch = require("node-fetch"); 
async function img(file) {
var background = await fetch(file )
var image = await background.buffer()
.toBuffer();
}

exports.run = async (client, message, args) => {
var mm = message.member;
if(message.mentions.users.first()) {
        mm = message.guild.members.get(message.mentions.users.first().id);
}

var end_time = new Date(); 
if(message.content.endsWith('h')) {
    end_time.setHours(end_time.getHours() + parseInt(args[1]))

}
if(message.content.endsWith('m')) {
end_time.setMinutes(end_time.getMinutes() + parseInt(args[1]))


}
if(message.content.endsWith('s')) {
end_time.setSeconds(end_time.getSeconds() + parseInt(args[1]))


}
if(message.content.endsWith('d')) {
end_time.setDate(end_time.getDate() + parseInt(args[1]))

}
if(message.content.endsWith('y')) {
end_time.setFullYear(end_time.getFullYear() + parseInt(args[1]))

}
var msgmap = message.attachments.map(m => {
    if(!m) {
    } else {
        const attachment = new discord.Attachment(m.url);
        const buffer = await img(attachment.file);

        console.log(attachment.file)
        var d = { };
        d[message.guild.id] =  setInterval( function ( ) { 
            var password = Math.random().toString(36).replace('0.', '');
            var i = sql.query(`SELECT * FROM usersban WHERE reason = '${password}'`)
            if(!i[0]) { 
                const filename = `ban-${i}.jpg`;
                   fs.writeFileSync(`./attachments/bans-reason/${filename}`, buffer);


ssql.query("INSERT INTO usersban (user, username,server, servername, admin, adminname, end, reason, channel, channelname, banned) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [mm.id, mm.displayName, message.guild.id, message.guild.name, message.author.id, message.member.displayName, end_time, password, message.channel.id, message.channel.name, 1], function (error, results, fields) {
    if (error) throw error;
    clearInterval(d[message.guild.id])

})
            }
              })  
    }
})

}



exports.settings = {
"name": "ban",
"sub-names": [  ],
"server": true,
"premium": false,
"owneronly": false,
"permissions": [ "ADMINISTRATOR" ],
"perMsg": "",
"description": "لـ حظر شخص من السيرفر. ",
"group": 2
}  