const express = require("express");
const {  Client, RichEmbed, Attachment  } = require("discord.js");
const { Util } = require('discord.js');
const Discord = require('discord.js');
var client = new Client();
const app = express();
var prefix = "#"
const fs = require('fs');

const ms = require("pretty-ms");
var timess = require("./time.json")
client.on('message', message => { 
if(message.content === prefix + "vip") { 
           if (!message.member.hasPermission('ADMINISTRATOR')) return;
let time = 2600000000;
let last = timess[client.user.id]
if (last !== null && time - (Date.now() - last) > 0) {
let times = (time - (Date.now() - last));
let embed = new Discord.RichEmbed()
         .setColor("#00FF00")
.setDescription(`Purchased By : <@600369127907131412>`)
.setTitle(`Number Bot  : 1
Time left: ${ms(times, {verbose:true})}`);
message.channel.send(embed)
} else {
timess[client.user.id] = Date.now();
fs.writeFile("./time.json", JSON.stringify(timess), function(e) {
if (e) throw e;
})
}
}
});


client.login("NjI5NzYxOTk2NjE4NzI3NDM5.XZiNPg.1hWjzRUnaR9MrypMJ34KOHpotKE");

و سوي ملف time.json
وحط فيه 
{"602231805352869936":1569754589401}
