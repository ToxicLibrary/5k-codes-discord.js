
exports.run = async (client, message, args, cmd) => {
    var errors = 0;
    var sussc = 0;
if(cmd === "bcrole") {
    var role = message.mentions.roles.first()
    if(role) { 
        if(!args[2]) return;
var time = setInterval( function ( ) { 
if(erorrs+sussc == role1.members.filter( m => m.presence.status !== "offline").size) {

message.channel.send(`**  تم الانتهاء من البرودكاست بنجاح 
${sussc} :white_check_mark: تم ارسال برودكاست الى
${errors} :x: تعذر ارسال البرودكاست لهم.**`);
clearInterval(time)
}
}, 1000)
var msgmap = message.attachments.map(m => {
if(!m) {
} else {
const attachment = new discord.Attachment(m.url);
role.members.filter( m => m.presence.status !== "offline").map(m => {
var msg = message.content.replace(`#${cmd} `, '').replace( '[user]', m);
try {
m.send(`${msg}`, attachment);     
sussc++;
}
  catch(error) {
      errors++;
  }
})
}    
})
if(msgmap.length == 0 )  {
    role.members.filter( m => m.presence.status !== "offline").map(m => {
        var msg = message.content.replace(`#${cmd} `, '').replace( '[user]', m);
try {
    m.send(`${msg}`)
    sussc++;
}
  catch(error) {
      errors++;
  }
})
}
    } else {
var role1 = message.guild.roles.find( r=> r.name == args[1]);
if(!role1) return message.channel.send(' ** :x: تعذر العثور على الرول **')
if(!args[2]) return;
var time = setInterval( function ( ) { 
if(erorrs+sussc == role1.members.filter( m => m.presence.status !== "offline").size) {

message.channel.send(`**  تم الانتهاء من البرودكاست بنجاح 
${sussc} :white_check_mark: تم ارسال برودكاست الى
${errors} :x: تعذر ارسال البرودكاست لهم.**`);
clearInterval(time)
}
}, 1000)
var msgmap = message.attachments.map(m => {
    if(!m) {
    } else {
    const attachment = new discord.Attachment(m.url);
    role1.members.filter( m => m.presence.status !== "offline").map(m => {
    var msg = message.content.replace(`#${cmd} `, '').replace( '[user]', m);
    try {
        m.send(`${msg}`, attachment);     
        sussc++;
        }
          catch(error) {
              errors++;
          }
            })
    }    
    })
    if(msgmap.length == 0 )  {
        role1.members.filter( m => m.presence.status !== "offline").map(m => {
    var msg = message.content.replace(`#${cmd} `, '').replace( '[user]', m);
    try {
        m.send(`${msg}`)
        sussc++;
    }
      catch(error) {
          errors++;
      }
        })
    }  
}
}
if(cmd === "bcall") {
    if(!args[1]) return;
    var time = setInterval( function ( ) { 
if(erorrs+sussc == message.guild.members.filter( m => m.presence.status !== "offline").size) {

    message.channel.send(`**  تم الانتهاء من البرودكاست بنجاح 
    ${sussc} :white_check_mark: تم ارسال برودكاست الى
    ${errors} :x: تعذر ارسال البرودكاست لهم.**`);
    clearInterval(time)
}
    }, 1000)
var msgmap = message.attachments.map(m => {
if(!m) {
} else {
const attachment = new discord.Attachment(m.url);
message.guild.members.forEach(m => {
var msg = message.content.replace(`#${cmd} `, '').replace( '[user]', m);
try {
    m.send(`${msg}`, attachment);     
    sussc++;
    }
      catch(error) {
          errors++;
      }
    })
}    
})
if(msgmap.length == 0 )  {
message.guild.members.forEach(m => {
if(!main_config.bot.owners.includes(m.id))  return;       
var msg = message.content.replace(`#${cmd} `, '').replace( '[user]', m);
try {
    m.send(`${msg}`)
    sussc++;
}
  catch(error) {
      errors++;
  }
})
}
}
if(cmd === 'bc') {
    if(!args[1]) return;
    var time = setInterval( function ( ) { 
if(erorrs+sussc == message.guild.members.filter( m => m.presence.status !== "offline").size) {

    message.channel.send(`**  تم الانتهاء من البرودكاست بنجاح 
    ${sussc} :white_check_mark: تم ارسال برودكاست الى
    ${errors} :x: تعذر ارسال البرودكاست لهم.**`);
    clearInterval(time)
}
    }, 1000)
var msgmap = message.attachments.map(m => {
if(!m) {
} else {
const attachment = new discord.Attachment(m.url);
message.guild.members.forEach(m => {
if(m.presence.status == "offline") return;
if(!main_config.bot.owners.includes(m.id))  return;

var msg = message.content.replace(`#${cmd} `, '').replace( '[user]', m);
try {
    m.send(`${msg}`, attachment);     
    sussc++;
    }
      catch(error) {
          errors++;
      }
})
}    
})
if(msgmap.length == 0 )  {
message.guild.members.forEach(m => {
if(m.presence.status == "offline") return;
if(!main_config.bot.owners.includes(m.id))  return;       
var msg = message.content.replace(`#${cmd} `, '').replace( '[user]', m);
try {
    m.send(`${msg}`);     
    sussc++;
    }
      catch(error) {
          errors++;
      }
    })
}
}

}
       
      
      
exports.settings = {
"name": "bc",
"sub-names": ["bcrole", "bcall"],
"premium": false,
"server": false,
"owneronly": false,
"permissions": [  ],
"perMsg": "",
"description": "لـ ارسال رسالة جماعية .",
"group": 3
}  