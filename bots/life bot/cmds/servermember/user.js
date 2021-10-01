    exports.run = async (client, message) => {
        var member = message.member;
        if(message.mentions.users.first()) {
            member = message.guild.members.get(message.mentions.users.first().id);
        }
    var r = member.roles;
var a = [];
if(!r) {
a.push('لايوجد')
} else { 
r.forEach(rr => {
if(rr.id == message.guild.id) return;
a.push(rr.name)
})
}

let embed = new discord.RichEmbed()
    .setColor( "BLACK" )
    .addField('» ID', '``' + member.id + '``')
    .addField('» Name',  member.displayName)
    .addField('» Roles', '``' + a.join(', ') + '``')
    .addField('» Joined discord at', '``' + countdown(new Date(member.user.createdTimestamp), undefined, undefined, 3).toString() + '``')
    .addField('» Joined server at', '``' + countdown(new Date(member.joinedTimestamp), undefined, undefined, 3).toString()  + '``')
    .setAuthor(`USER - ${member.displayName}`, 'https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif')
    .setTimestamp();
    message.channel.send({embed});
}



exports.settings = {
    "name": "user",
    "sub-names": [ "id" ],
    "server": true,
    "premium": false,
    "owneronly": false,
    "permissions": [  ],
    "perMsg": "",
    "description": "لـ عرض الملف الشخصي ",
    "group": 2
}  