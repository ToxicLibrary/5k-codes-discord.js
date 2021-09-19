
const express = require('express');
const http = require('http');
const ms = require("parse-ms")
const app = express();
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://bcdsfsdf.glitch.me/`);
}, 280000);
const Discord = require('discord.js');
const moment = require("moment")
const db = require("quick.db")
const client = new Discord.Client();
const fs = require("fs")
client.on('guildCreate', guild => {
console.log(`✅ \`${client.user.username}\` Join New Server.`)
console.log("❯ Server/ID:",`» \`${guild.name}\` | \`(ID: ${guild.id})\``)
console.log("❯ Server Owner:",`» ${guild.owner}`)
console.log("❯ Member Count:",`» \`${guild.memberCount}\``)
console.log("❯ Servers Counter:",`» \`${client.guilds.size}\``)
})

const owners = ["432231487916736542"]
client.on("message", async msg => {
if(msg.author.bot || msg.channel.type === "dm") return undefined;
let args = msg.content.split(' ');
db.fetch(`vipownership${client.user.id}_`)
db.fetch(`vippremiumnumber${client.user.id}_`)
db.fetch(`vipguild${client.user.id}_`)
db.fetch(`vipprefix${client.user.id}_`)
if(args[0].toLowerCase() == `vipmove`) {
let ownership = msg.mentions.users.first()
let premiumnumber = msg.content.split(" ")[2]
let guild = msg.content.split(" ")[3]
let prefix = msg.content.split(" ")[4]
if(ownership === msg.author.bot) return msg.channel.send(`**:x: | Error**`)
if(!msg.author.id === owners) return msg.channel.send('**:x: | Error**')
if(!guild || !ownership || !premiumnumber || !prefix) return msg.channel.send(`**:x: | Please Type Command True Ex: \`vipmove [MentionUser] [PremiumNumber] [GuildID] [Prefix]\`**`)
msg.channel.send(`**:white_check_mark: | Done**`)
db.set(`vipownership${client.user.id}_`, ownership.id)
db.set(`vippremiumnumber${client.user.id}_`, Number(premiumnumber))
db.set(`vipguild${client.user.id}_`, guild)
db.set(`vipprefix${client.user.id}_`, prefix)
ownership.send(`**Link: ${await client.generateInvite("ADMINISTRATOR")}
سيتم خذف الرساله بعد 2 دقائق**`).then(e => e.delete(2*60*1000))
}
})
client.on("message", async msg => {
if(msg.author.bot || msg.channel.type === "dm") return undefined;
let args = msg.content.split(' ');
if(args[0].toLowerCase() == `${db.fetch(`vipprefix${client.user.id}_`)}viptransfer`) {
let ownerships = msg.mentions.users.first()
if(ownerships === msg.author.bot) return msg.channel.send(`**:x: | Error**`)
if(!ownerships === msg.author) return msg.channel.send(`**:x: | Error**`)
if(!ownerships) return msg.channel.send(`**:x: | Please Type Command True Ex: \`${db.fetch(`vipprefix${client.user.id}_`)}viptransfer [MentionUser]\`**`)
msg.channel.send(`**:white_check_mark: | Done**`)
db.set(`vipownership${client.user.id}_`, ownerships.id)
ownerships.send(`**Link: ${await client.generateInvite("ADMINISTRATOR")}
سيتم خذف الرساله بعد 2 دقائق**`).then(e => e.delete(2*60*1000))
}
})

client.on("message", async msg => {
if(msg.author.bot || msg.channel.type === "dm") return undefined;
let args = msg.content.split(' ');
if(args[0].toLowerCase() == `${db.fetch(`vipprefix${client.user.id}_`)}vipadd`) {
db.fetch(`othership_${client.user.id}`)
let otherownerships = msg.mentions.users.first()
if(otherownerships === otherownerships.bot) return msg.channel.send(`**:x: | Error**`)
if(!otherownerships === msg.author) return msg.channel.send(`**:x: | Error**`)
if(!otherownerships) return msg.channel.send(`**:x: | Please Type Command True Ex: \`${db.fetch(`vipprefix${client.user.id}_`)}vipadd [MentionUser]\`**`)
msg.channel.send(`**:white_check_mark: | Done**`)
db.push(`othership${client.user.id}_`, `${otherownerships}`)
}
})

client.on('message', async message => {
if(message.author.bot) return undefined;
let args = message.content.split(' ');
if(args[0].toLowerCase() == `${db.fetch(`vipprefix${client.user.id}_`)}vip`) {
let user = client.user
let onwerq = await db.fetch(`othership${user.id}_`).join(" | ")
if(onwerq === null) onwerq = "No othership"
message.channel.send(`**> Premiumnumber: \`\`${await db.fetch(`vippremiumnumber${user.id}_`)}\`\` | Prefix: \`\`${db.fetch(`vipprefix${client.user.id}_`)}\`\`
> Ownership: <@${db.fetch(`vipownership${user.id}_`)}>
> Ownership(s): ${onwerq} | \`\`(${db.fetch(`othership${user.id}_`).length})\`\`**`)
}
});

client.on("message", async message => {
if(message.author.bot || message.channel.type === "dm") return undefined;
let args = message.content.split(' ');
var argresult = message.content.split(` `).slice(1).join(' ');
if(!db.fetch(`vipownership_${client.user.id}`) === message.author) return message.channel.send(`**:x: | Error**`)
if(!db.fetch(`othership_${client.user.id}`) === message.author) return message.channel.send(`**:x: | Error**`)
let p = db.fetch(`vipprefix${client.user.id}_`)
if(args[0].toLowerCase() == `${p}setplaying`) {
if(!argresult) return message.channel.send(`**:x: | Please Type Command True Ex: \`${p}setplaying [Game]\`**`);
client.user.setGame(argresult);
message.channel.send(`**:white_check_mark: Changed the Bot Playing to » \`${argresult}\`**`)
} else                      
if(args[0].toLowerCase() == `${p}setwatch`) {
if(!argresult) return message.channel.send(`**:x: | Please Type Command True Ex: \`${p}setwatch [Game]\`**`);
client.user.setActivity(argresult, {type:'WATCHING'});
message.channel.send(`**:white_check_mark: Changed the Bot Watching to » \`${argresult}\`**`)
} else 
if(args[0].toLowerCase() == `${p}setlisten`) {
if(!argresult) return message.channel.send(`**:x: | Please Type Command True Ex: \`${p}setlisten [Game]\`**`);
client.user.setActivity(argresult , {type:'LISTENING'});
message.channel.send(`**:white_check_mark: Changed the Bot Listening to » \`${argresult}\`**`)
} else 
if(args[0].toLowerCase() == `${p}setstream`) {
if(!argresult) return message.channel.send(`**:x: | Please Type Command True Ex: \`${p}setstream [Game]\`**`);
client.user.setGame(argresult, "https://www.twitch.tv/P");
message.channel.send(`**:white_check_mark: Changed the Bot Streaming to » \`${argresult}\`**`)
}
if(args[0].toLowerCase() == `${p}setname`) {
if(!argresult) return message.channel.send(`**:x: | Please Type Command True Ex: \`${p}setname [Name]\`**`);
client.user.setUsername(argresult).then
message.channel.send(`**:white_check_mark: Changed the Bot Name to » \`${argresult}\`**`)
} else
if(args[0].toLowerCase() == `${p}setavatar`) {
if(!argresult) return message.channel.send(`**:x: | Please Type Command True Ex: \`${p}setavatar [URL]\`**`);
client.user.setAvatar(argresult);
message.channel.send(`**:white_check_mark: Changed the Bot Avatar to » \`${argresult}\`**`);
} else                      
if(args[0].toLowerCase() == `${p}setprefix`) {
if(!argresult) return message.channel.send(`**:x: | Please Type Command True Ex: \`${p}setprefix [Prefix]\`**`);
db.set(`vipprefix${client.user.id}_`, argresult)
message.channel.send(`**:white_check_mark: Changed the Bot Prefix to » \`${argresult}\`**`)
} else                      
if(args[0].toLowerCase() == `${p}restart`) {
message.channel.send(`**:white_check_mark: | Restarting**`).then(() => {
client.destroy().then(() => { client.login("NjU5NTA3NjI2MDM5NTc0NTM5.XgPUXQ.JQb11cNUvXe9F5jBclKFPQ5GAc0") })
})
}
});

client.on('message', message => {
if(message.content.startsWith(db.fetch(`vipprefix${client.user.id}_`) + 'bc')) {
if(!db.fetch(`vipownership_${client.user.id}`) === message.author) return message.channel.send(`**:x: | Error**`)
if(!db.fetch(`othership_${client.user.id}`) === message.author) return message.channel.send(`**:x: | Error**`)
if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD') || !message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return undefined;
let args = message.content.split(" ").slice(1).join(" ");
if(!args) return message.channel.send(`**❌ | please type the broadcast message**`)
let filter = m => m.author.id == message.author.id
let broadcastt = new Discord.RichEmbed()
.setColor('#04ebf3')
.setDescription(`**[1]** All Members
**[2]** Online Members
**[3]** Role Members
**[0]** Cancel**`)
message.channel.send(broadcastt).then(msg => {
message.channel.awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
}).then(collected => {
if(collected.first().content === '1') {
message.channel.bulkDelete(1)
message.channel.send(`**Broadcast begin send to \`${message.guild.members.size}\` members**`);
msg.delete()
message.guild.members.forEach(m => {
m.send(args.replace('[user]', m))
})
}
if(collected.first().content === '2') {
msg.delete()
message.channel.bulkDelete(1)
message.channel.send(`**Broadcast begin send to \`${message.guild.members.filter(m=>m.presence.status == 'all').size}\` members**`);
message.guild.members.filter(m => m.presence.status === 'all').forEach(m => {
m.send(args.replace('[user]', m)) 
})
}
if(collected.first().content === '3') {
let filter = m => m.author.id == message.author.id
message.channel.send(`**✅ | Mention role**`).then(s => {
message.channel.awaitMessages(filter, {
max: 1,
time: 90000,
errors: ['time']
}).then(collected => {
let s = message.guild.roles.filter(x => x.name === collected.first().mentions.roles)
if(!s) return message.channel.send(`**-_-**`)
message.channel.send(`**Broadcast begin send to \`${s}\` role**`);
message.guild.roles.filter(m => m.name === s).forEach(m => {
m.send(args.replace('[user]', m)) 
})
})
})
}
if(collected.first().content === '0') {
message.channel.bulkDelete(1)
msg.delete()
message.channel.send(`**Broadcast Has Been Canceled**`);
}
})
})
}
});

client.login("NjU5NTA3NjI2MDM5NTc0NTM5.XgPUXQ.JQb11cNUvXe9F5jBclKFPQ5GAc0");