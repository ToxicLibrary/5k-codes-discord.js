// التعريفات الاساسية -- > 
discord = require('discord.js');
client = new discord.Client();
fs = require('fs')
mysql = require('sync-mysql');
mysql2 = require('mysql'); 
moment = require('moment');
countdown = require("countdown");   

// simple functions 
var responsess = { };
var reactions = { };
var errors = 0;
awaitMSG = (msg, author, guild, cmd) => {   
        if(!responsess[guild]) responsess[guild] = { };
        if(!responsess[guild][author]) responsess[guild][author]  = {'cmd': cmd, 'boolean': true};
    }
awaitReaction = (userid, guild, msgid, cmd) => {
if(!reactions[guild]) reactions[guild] = { };
if(!reactions[guild][userid]) reactions[guild][userid] = { };
reactions[guild][userid]['r'] = { 
    'msgid': msgid
    }
}
// الاضافات ==> 
require("./bot.js")(client);
require("./functions/bot.js")(client);
require("./functions/bank.js")(client);

// الكونفج ==> 
main_config = require("./config/main.js");
database_config = require("./config/database.js");
website_config = require("./config/website.js");

// الداتا بيس
loadMySQL();
lastinvites = { };

// الفاكشنات ( تعاريف الايفنتات و الاوامر )
load();


// الاوامر
// await reactions

client.on('messageReactionAdd', (r, user) => {
    if(reactions[r.message.guild.id]) {
        if(reactions[r.message.guild.id][user.id]) {
            if(reactions[r.message.guild.id][user.id]['r']['msgid'] == r.message.id) {

    r.message.channel.fetchMessage(r.message.id).then( m => m.edit('**:white_check_mark: done**').then(mm => mm.delete(5000)));
    sql.query(`UPDATE guilds SET reaction = '${r.emoji.name}' WHERE id = ${r.message.guild.id}`);
    delete reactions[r.message.guild.id];
            }
        } 
    }
    
})
// reaction role
client.on("raw", event =>
{
    if ( event.t === "MESSAGE_REACTION_ADD" ) {
        if(checkReaction(event.d)) {
            var result = sql.query(`SELECT * FROM guilds WHERE id = ${event.d.guild_id}`);
            if(!result.length) return;
            var role = client.guilds.get(event.d.guild_id).roles.get(result[0].roleid);
             client.guilds.get(event.d.guild_id).members.get(event.d.user_id).addRole(role).catch(err => errors++);
        }
        }
})

client.on('message', message => {
    if(message.author.bot) return;

    var prefix = main_config.bot.prefix;
    if(message.guild) {
       prefix = getResult(message.guild.id);
    }
    let mm = message.mentions.users.first();
    if(!mm) {

    } else { 
    if(mm.id == client.user.id) { 
        const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
     prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : getResult(message.guild.id);
    
    } 
}
    if(message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(commands[command]) { 
        var cmd = require(`./cmds/${commands[command].group}/${commands[command].folder}`)
        if( message.guild && premium_servers.includes(message.guild.id)) return; 
// owner only
if(cmd.settings.owneronly) {
            if(!main_config.bot.owners.includes(message.author.id)) return;
            cmd.run(client, message, args, command);
}
// premium
if(cmd.settings.premium) return;

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

// تسجيل دخول الى الكلنت

client.login(main_config.bot.token_bot)