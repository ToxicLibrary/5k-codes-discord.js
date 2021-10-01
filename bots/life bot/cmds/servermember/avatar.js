exports.run = async (client, message, args) => {
var member = message.member;
if(message.mentions.users.first()) {
    console.log(member);
            member = message.mentions.users.first();
            console.log(member)
}

if(args[0] == "server") {
message.channel.send(message.guild.iconURL)
} else {
message.channel.send(message.guild.members.get(member.id).user.displayAvatarURL)
}
}



exports.settings = {
    "name": "avatar",
    "sub-names": [ ],
    "server": true,
    "premium": false,
    "owneronly": false,
    "permissions": [  ],
    "perMsg": "",
    "description": "لـ عرض صورة العرض ",
    "group": 2
}  