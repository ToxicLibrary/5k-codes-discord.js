var data = { }
setInterval( function ( ) {
var result = sql.query(`SELECT * FROM guilds WHERE links = 1`);
for (let i = 0; i < result.length; i++) {
data[result[i].id] = {
'admin': result[i].linkadmin,
'on': true,
};
}
}, 5000)
exports.run = (client, message) => {
if(message.guild) {
if(data[message.guild.id]) {
if(data[message.guild.id]['on']) {
    if(data[message.guild.id]['admin']) {
        if(!/discord\.gg\/\w+|bot\.discord\.io\/\w+|discordapp\.com\/invites\/\w+|discord\.me\/\w+/g.test(message.content)) return
        let links = message.content.match(/(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i);
           if(links) {
            if(!message.member.hasPermission("MANAGE_MESSAGES")) {
             message.delete();
            }
            }
    } else {
        if(!/discord\.gg\/\w+|bot\.discord\.io\/\w+|discordapp\.com\/invites\/\w+|discord\.me\/\w+/g.test(message.content)) return
        let links = message.content.match(/(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i);
           if(links) {
             message.delete();
           }
    }
}
}
}
};

      