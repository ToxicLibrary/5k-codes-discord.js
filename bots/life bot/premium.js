
// التعريفات الاساسية -- > 
discord = require('discord.js');
client = new discord.Client();
fs = require('fs')
mysql = require('sync-mysql');
mysql2 = require('mysql');
moment = require('moment');
countdown = require("countdown");   
jimp = require('jimp')

premium_servers = [ ];
// premium config >> 
var premium_config = { 
"token": process.argv[2],

}

// الاضافات ==> 
require("./bot.js")(client);


// الكونفج ==> 
main_config = require("./config/main.js");
database_config = require("./config/database.js");
website_config = require("./config/website.js");

// الداتا بيس
loadMySQL();

// الفاكشنات ( تعاريف الايفنتات و الاوامر )
load();

// التحقق من السيرفرات
setInterval ( function ( ) {
var result = sql.query(`SELECT * FROM premium WHERE botid = ${client.user.id}`);
if ( result[0].enddate < new Date() ) {
    exec(`pm2 stop premium.js --name ${result[i].id} -- ${result[i].token}`)
}

if(result[0].move == 1) { 
    if(client.guilds.size == 3) {
        var guilds = [ ];
        client.guilds.forEach(g => {
        guilds.push(g.id);
        })
        var index = guilds.indexOf(result[0].guild);
        var index2 = guilds.indexOf("470064194948038659");

        if (index > -1) {
            guilds.splice(index, 1);
        }
        if (index2 > -1) {
            guilds.splice(index2, 1);
        }
        guilds.forEach(g => {
            sql.query(`UPDATE premium SET guild = ${g} WHERE WHERE botid = ${client.user.id}`)
            sql.query(`UPDATE premium SET move = 0 WHERE WHERE botid = ${client.user.id}}`)
            result = sql.query(`SELECT * FROM premium WHERE botid = ${client.user.id}`);
            client.guilds.forEach(g => {
                if(g.id == "470064194948038659") return;
                if(g.id == result[0].guild) return;
                g.leave();
                })
        })
    }
    } else {
client.guilds.forEach(g => {
if(g.id == "470064194948038659") return;
if(g.id == result[0].guild) return;
g.leave();
})
    }

}, 1000*60)

// الاوامر
client.on('message', message => {
    if(message.author.bot) return;
    if(message.content.indexOf(main_config.bot.prefix) !== 0) return;
    const args = message.content.slice(main_config.bot.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(commands[command]) { 
        var cmd = require(`./cmds/${commands[command].group}/${commands[command].folder}`)
        if( message.guild && premium_servers.includes(message.guild.id)) return; 
// owner only
if(cmd.settings.owneronly) {
            if(!main_config.bot.owners.includes(message.author.id)) return;
            cmd.run(client, message, args, command);
}

// server only
if(cmd.settings.server) {
    if(!message.guild) return;
    // permissions
    if(cmd.settings.permissions.length > 0) {
        // يشيك اذا مامعه هالبرمشن
        if(!message.member.hasPermission(cmd.settings.permissions)) {
            // يشيك اذا فيه رساله 
            if(cmd.settings.perMsg.length > 0) {
                message.channel.send(cmd.settings.perMsg.replace('[user]', message.member))
            } 
            // اذا معه البرمشن يصير الي تحت
        } else { 
            cmd.run(client, message, args, command);
        }


    } else {
        cmd.run(client, message, args, command);

    }
    
}
// اخيرا اذا ماكانت مختاره للسيرفر فقط او للاونر فقط. يتنفذ الامر بشكل طبيعي
if(cmd.settings.server)  return;
if(cmd.settings.owneronly)  return;
cmd.run(client, message, args, command);


        }
})

client.login(premium_config.token)