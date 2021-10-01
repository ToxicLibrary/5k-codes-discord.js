exports.run = async (client, message, args) => {
if(args[0] =="chat") {
    var allow = new discord.Permissions(message.channel.permissionOverwrites.get(message.guild.id).allow).toArray()

message.guild.channels.forEach(c => {
    if(c.type !== "text") return;


if(allow.includes('READ_MESSAGES')) { 
    c.overwritePermissions(message.guild.id, {
        READ_MESSAGES: false
    })
} else {
    c.overwritePermissions(message.guild.id, {
        READ_MESSAGES: true
    })
}
})

}
if(args[0] =="rooms") {
    var allow = new discord.Permissions(message.guild.channels.filter(c => c.type =="voice").first()).toArray()

message.guild.channels.forEach(c => {
    if(c.type !== "voice") return;


if(allow.includes('VIEW_CHANNEL')) { 
    c.overwritePermissions(message.guild.id, {
        VIEW_CHANNEL: false
    })
} else {
    c.overwritePermissions(message.guild.id, {
        VIEW_CHANNEL: true
    })
}
})

}
}
   
   
   
   exports.settings = {
       "name": "private",
       "sub-names": [ ],
       "server": true,
       "premium": false,
       "owneronly": false,
       "permissions": [ "MANAGE_CHANNELS" ],
       "perMsg": "",
       "description": "لـ اخفاء الرومات واظهارها. ",
       "group": 2
   }  