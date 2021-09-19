 @everyone | @here  :Verefied~1: , Toxic Codes
~~~~~~~~~~~~

https://pastebin.com/vstzYFju


~~~~~~~~~~~~
 :Description: Description : ßæÏ áæ ÏÎáÊ ÔÎÕ Ñæã ÕæÊì ÇáÈæÊ ÈíÚØíå ÑÊÈå
ÈÊßæä ÇäÊ ãÍÏÏåÇ ÇÞÈá ßÏÇ  æáãÇ íÎÑÌ ãä ÇáÑæã ÇáÕæÊì ÈÊäÔÇá ãäå ÇáÑÊÈå
ØÈÚÇ ÊÝÚíá æ ÇáÛÇÁ ÊÝÚíá ãÚ ÇãßÇäíå ÊÍÏíÏ ÇáÑÊÈå
(ÊßÊÈ ÌÒÁ ãä ÇÓãåÇ Çæ ÊÓæíáåÇ ãäÔä)
[!!set-voicerole / !!voicerole off /!!voicerole on /!!voicerole info /]
 
ãÊäÓÇÔ voicerole.json
 :Spreader: Shared By : @ÝÎÑ ÇáÈØÇØÓ ÇáãäÚßÔå :/
 :Creator: Creato

















const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!!"
const fs = require("fs")
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
//**please pay attention :-
//this code was created by Baron ?#7159 => YotubeChannel (www.youtube.com/c/BaronTube);
const baron = JSON.parse(fs.readFileSync('./voicerole.json', 'utf8'))
client.on("message", message => {
  if(!message.channel.guild) return; //all copyrights reserved to Baron ?#7159
  if(message.content.startsWith(prefix + 'set-voicerole')) {
    var args = message.content.split(" ").slice(1).join(" ")
    if(!args) return message.channel.send('**Bruh, type the role name**')//all copyrights reserved to Baron ?#7159
    let findrole = message.mentions.roles.first() || message.guild.roles.find(r => r.id === args) || message.guild.roles.find(r => r.name.toLowerCase().includes(args));
    if(!findrole) return message.channel.send(`**I Can't find __${args}__, r you drunk ?**`)  
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
    message.channel.send(`**hell yeah, the voice role was updated to ${findrole}**`);//all copyrights reserved to Baron ?#7159
    baron[message.guild.id] = {
      onoff: 'On',
      voicerole: findrole.name
      }//all copyrights reserved to Baron ?#7159
          fs.writeFile("./voicerole.json", JSON.stringify(baron), (err) => {
              if (err) console.error(err)
          })//all copyrights reserved to Baron ?#7159
  }
  })//all copyrights reserved to Baron ?#7159
  client.on("message", message => {
    if(!message.channel.guild) return;
    if(message.content.startsWith(prefix + 'voicerole off')) {//all copyrights reserved to Baron ?#7159
    let perms = message.member.hasPermission(`MANAGE_GUILD`)
    if(!perms) return message.reply(`**You don't have __MANAGE_GUILD__ permission.**`)//all copyrights reserved to Baron ?#7159
      if(!baron[message.guild.id]){//all copyrights reserved to Baron ?#7159
       message.channel.send(`**It's Already Off, Type __${prefix}set-voicerole__ to activate it**`)
      }
      if(baron[message.guild.id]){//all copyrights reserved to Baron ?#7159
      if(baron[message.guild.id].onoff === 'On'){
      baron[message.guild.id].onoff = 'Off'
      message.channel.send(`**Voicerole is __${baron[message.guild.id].onoff}__**`);//all copyrights reserved to Baron ?#7159
      }
      }//all copyrights reserved to Baron ?#7159
      fs.writeFile("./voicerole.json", JSON.stringify(baron), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);//all copyrights reserved to Baron ?#7159
          });    
    })
  }
})//all copyrights reserved to Baron ?#7159
client.on("message", message => {
  if(!message.channel.guild) return;
  if(message.content.startsWith(prefix + 'voicerole on')) {//all copyrights reserved to Baron ?#7159
    let perms = message.member.hasPermission(`MANAGE_GUILD`)
    if(!perms) return message.reply(`**You don't have __MANAGE_GUILD__ permission.**`)
    if(!baron[message.guild.id]){
     message.channel.send(`**Please sur, u need to type __${prefix}set-voicerole__**`)//all copyrights reserved to Baron ?#7159
    }
    if(baron[message.guild.id]){//all copyrights reserved to Baron ?#7159
    if(baron[message.guild.id].onoff === 'Off'){
    baron[message.guild.id].onoff = 'On'//all copyrights reserved to Baron ?#7159
    message.channel.send(`**Voicerole is __${baron[message.guild.id].onoff}__**`);
    } else {
    message.channel.send(`**It's Already __${baron[message.guild.id].onoff}__**`)
    }}
    
    fs.writeFile("./voicerole.json", JSON.stringify(baron), (err) => {//all copyrights reserved to Baron ?#7159
          if (err) console.error(err)
          .catch(err => {
            console.error(err);
        });    
  })//all copyrights reserved to Baron ?#7159
}
})
client.on("message", message => {//all copyrights reserved to Baron ?#7159
  if(!message.channel.guild) return;
  if(message.content.startsWith(prefix + 'voicerole info')) {//all copyrights reserved to Baron ?#7159
  let perms = message.member.hasPermission(`MANAGE_GUILD`)
  if(!perms) return message.reply(`**You don't have __MANAGE_GUILD__ permission.**`)
var embed = new Discord.RichEmbed()
.addField(`VoiceRole : :sparkles:  `, `
State : __${baron[message.guild.id].onoff}__
Role : __${baron[message.guild.id].voicerole}__`)
.setColor(`BLUE`)
message.channel.send({embed})
}
})
client.on("voiceStateUpdate" , (oldMember, newMember) => {//all copyrights reserved to Baron ?#7159
  let baronrole = oldMember.guild.roles.find('name',baron[oldMember.guild.id].voicerole);
  let newUserChannel = newMember.voiceChannel
let oldUserChannel = oldMember.voiceChannel
if(oldUserChannel === undefined && newUserChannel !== undefined) {//all copyrights reserved to Baron ?#7159
  oldMember.addRole(baronrole);
} else
if(newUserChannel === undefined){//all copyrights reserved to Baron ?#7159
oldMember.removeRole(baronrole)
}//all copyrights reserved to Baron ?#7159
})