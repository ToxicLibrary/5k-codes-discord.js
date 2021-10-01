
// التعريفات الاساسية -- > 
discord = require('discord.js');
client = new discord.Client();
fs = require('fs')
mysql = require('sync-mysql');
mysql2 = require('mysql');
moment = require('moment');
countdown = require("countdown");   

// الاضافات ==> 
require("./bot.js")(client);
require("./functions/bank.js");
require("./functions/bot.js")(client);

// الكونفج ==> 
main_config = require("./config/main.js");
database_config = require("./config/database.js");
website_config = require("./config/website.js");

// الداتا بيس
loadMySQL();

// الفاكشنات ( تعاريف الايفنتات و الاوامر )
load();
lastinvites = { };


client.on('message', message => {
   if(message.author.bot) return;
   if(!main_config.bot.owners.includes(message.author.id))  return;
   if(message.content.indexOf(main_config.bot.prefix) !== 0) return;
   const args = message.content.slice(main_config.bot.prefix.length).trim().split(/ +/g);
   const command = args.shift().toLowerCase();
   
    if(commands[command]) { 
var cmd = require(`./cmds/${commands[command].group}/${commands[command].folder}`)
help[cmd.settings.name] ={ 
    des: cmd.settings.description, 
    group: cmd.settings.group,
    settings: cmd.settings
}

if(cmd.settings.owneronly ) {
    if(main_config.bot.owners.includes(message.author.id)) {
        cmd.run(client, message, args, load);
    }
} else { 
   if(cmd.settings.premium) {
       if(client.user.id == main_config.bot.botid) return;
       if(cmd.settings.server) {
           if(!message.guild) return;
           if(cmd.settings.permissions.length > 0) { 
              if(!message.member.hasPermission(cmd.settings.permissions)) {
                  if(cmd.settings.perMsg.length > 0) {
                      message.channel.send(cmd.settings.perMsg.replace('[user]', message.member))
                  } 
              } else { 
                  cmd.run(client, message, args, command);
              } 
          } else {
              cmd.run(client, message, args, command);
          }
       }  else { 
          if(cmd.settings.permissions.length > 0) { 
              if(!message.member.hasPermission(cmd.settings.permissions)) {
                  if(cmd.settings.perMsg.length > 0) {
                      message.channel.send(cmd.settings.perMsg.replace('[user]', message.member))
                  } 
              } else { 
                cmd.run(client, message, args, command);
            } 
          } else {
            cmd.run(client, message, args, command);
        }
           }   
      } else { 
if(cmd.settings.server) {
    if(!message.guild) return;
    if(cmd.settings.permissions.length > 0) { 
       if(!message.member.hasPermission(cmd.settings.permissions)) {
           if(cmd.settings.perMsg.length > 0) {
               message.channel.send(cmd.settings.perMsg.replace('[user]', message.member))
           } 
       } else { 
        cmd.run(client, message, args, command);
    } 
   } else {
    cmd.run(client, message, args, command);
}
}  else { 
   if(cmd.settings.permissions.length > 0) { 
       if(!message.member.hasPermission(cmd.settings.permissions)) {
           if(cmd.settings.perMsg.length > 0) {
               message.channel.send(cmd.settings.perMsg.replace('[user]', message.member))
           } 
       } else { 
        cmd.run(client, message, args, command);
    } 
   } else {
    cmd.run(client, message, args, command);
}
    }    
}
}
    }
})

client.login(main_config.bot.token_bot)