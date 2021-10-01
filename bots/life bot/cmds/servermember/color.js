exports.run = async (client, message, args) => {
    var result = sql.query(`SELECT * FROM channels WHERE id = ${message.guild.id} AND channel = ${message.channel.id}`)
if(!result[0]) { 
    var key = parseInt(args[0]);
    if(key == 0) {
        message.channel.send(
            {
            "embed": {
            "description": "تم مسح لونك",
            "color":  "2233423",
            "footer": {
            "icon_url": message.author.avatarURL,
            "text": "Requested by " + message.author.username
            }
            }
            
            }
            );
            message.member.roles.forEach(r => {
                if(parseInt(r.name)) {
                    message.member.removeRole(r.id);
                }
            })
    } else {
    if(!key) return    message.channel.send(
    {
    "embed": {
    "description": "يجب ان تقوم بأدخال رقم. :1234:",
    "color":  "2233423",
    "footer": {
    "icon_url": message.author.avatarURL,
    "text": "Requested by " + message.author.username
    }
    }
    
    }
    );
          var role = message.guild.roles.find(r => r.name ==  args[0]);
    
          if(!role) return message.channel.send(
    {
    "embed": {
    "description": "رقم غير صحيح",
    "color":  "2233423",
    "footer": {
    "icon_url": message.author.avatarURL,
    "text": "Requested by " + message.author.username
    }
    }
    }
    );
    if(role.hasPermission(["ADMINISTRATOR", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "VIEW_AUDIT_LOG", "MANAGE_ROLES", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS", "MANAGE_WEBHOOKS", "DEAFEN_MEMBERS", "MUTE_MEMBERS", "MENTION_EVERYONE"], true)) return;
    message.member.addRole(role).then(text => {
    message.channel.send(
    {
    "embed": {
    "description": "تم تغير الون بنجاح",
    "color":  role.color,
    "footer": {
    "icon_url": message.author.avatarURL,
    "text": "Requested by " + message.author.username
    }
    }
    
    });
                    })
                    message.member.roles.forEach(r => {
                        if(parseInt(r.name)) {
                            message.member.removeRole(r.id);
                        }
                    })
}
} else { 
    if(result[0].color_act == 1) return;
    
    var key = parseInt(args[0]);
    if(key == 0) {
        message.channel.send(
            {
            "embed": {
            "description": "تم مسح لونك",
            "color":  "GREEN",
            "footer": {
            "icon_url": message.author.avatarURL,
            "text": "Requested by " + message.author.username
            }
            }
            
            }
            );
            message.member.roles.forEach(r => {
                if(parseInt(r.name)) {
                    message.member.removeRole(r.id);
                }
            })
    } else {
    if(!key) return    message.channel.send(
    {
    "embed": {
    "description": "يجب ان تقوم بأدخال رقم. :1234:",
    "color":  "RED",
    "footer": {
    "icon_url": message.author.avatarURL,
    "text": "Requested by " + message.author.username
    }
    }
    
    }
    );
          var role = message.guild.roles.find(r => r.name ==  args[0]);
    
          if(!role) return message.channel.send(
    {
    "embed": {
    "description": "رقم غير صحيح",
    "color":  "RED",
    "footer": {
    "icon_url": message.author.avatarURL,
    "text": "Requested by " + message.author.username
    }
    }
    }
    );
    if(role.hasPermission(["ADMINISTRATOR", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "VIEW_AUDIT_LOG", "MANAGE_ROLES", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS", "MANAGE_WEBHOOKS", "DEAFEN_MEMBERS", "MUTE_MEMBERS", "MENTION_EVERYONE"], true)) return;
    message.member.addRole(role).then(text => {
    message.channel.send(
    {
    "embed": {
    "description": "تم تغير الون بنجاح",
    "color":  role.hexColor,
    "footer": {
    "icon_url": message.author.avatarURL,
    "text": "Requested by " + message.author.username
    }
    }
    
    });
                    })
                    message.member.roles.forEach(r => {
                        if(parseInt(r.name)) {
                            message.member.removeRole(r.id);
                        }
                    })
}
}     
}
    
    
    
exports.settings = {
"name": "color",
"sub-names": [ ],
"server": true,
"premium": false,
"owneronly": false,
"permissions": [  ],
"perMsg": "",
"description": " لـ تغيير لون العضو. ",
"group": 2
}  