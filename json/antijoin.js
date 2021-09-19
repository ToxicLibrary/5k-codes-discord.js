/*
@everyone, - جميع الحقوق محفوظة لدى كودز
» :Description: - وصف الكود :
 كود antijoin
يعني تحدد حد الادنى للايام انشاء الحساب لاي شخص يدخل السيرفر
زي الكود يلي نشره ريبل 
لاكن هذا مع تحديد الايام عن طريق امر
<prefix>setJoin <عدد الايام>
وتفعيل والغاء تفعيل
<prefix>antijoin <on/off>
يحتاج ملف antijoin.json
+
تعريف fs
تكتب ذا في السورس الاساسي
في const client = new Discord.Client()
وذي الطقه
const fs = require('fs')
وتثبت البكج 
npm i fs
» :Creator~1: - صانع الكود : imkij + انا خليته تفعيل والغاء تفعيل وتحديد الايام
» :Spreader~1: - ناشر الكود : @Deleted User
*/

let antijoin = JSON.parse(fs.readFileSync('./antijoin.json' , 'utf8'));
/*يحتاج تعرف بكج const fs = require('fs')
طبعا لو مو معرف البكج ^
+ تثبت البكج npm i fs
*/
client.on('message', message => {
    if(message.content.startsWith(prefix + "antijoin on")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
antijoin[message.guild.id] = {
onoff: 'On',
}
message.channel.send(`**✅ The AntiJoin Is __𝐎𝐍__ !**`)
          fs.writeFile("./antijoin.json", JSON.stringify(antijoin), (err) => {
            if (err) return console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }

        })



client.on('message', message => {
    if(message.content.startsWith(prefix + "antijoin off")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
antijoin[message.guild.id] = {
onoff: 'Off',
}
message.channel.send(`**⛔ The AntiJoin Is __𝐎𝐅𝐅__ !**`)
          fs.writeFile("./antijoin.json", JSON.stringify(antijoin), (err) => {
            if (err) return console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }

        })
         client.on('message', message => {
          if (!message.channel.guild) return;


   if(message.content.startsWith(prefix + "setJoin")) {
          let time = message.content.split(" ").slice(1).join(" ");
       if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
       if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if (!time) return message.channel.send('Please Type The Account Created Time [Days]');
let embed = new Discord.RichEmbed()
.setTitle('**Done The AntiJoin Code Has Been Setup**')
.addField('Account Create Time:', `${time}.`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
antijoin[message.guild.id] = {
created: time,
onoff: 'On',
}
fs.writeFile("./antijoin.json", JSON.stringify(antijoin), (err) => {
if (err) console.error(err)
})
   }})

client.on("guildMemberAdd", async member => {
  if(!antijoin[member.guild.id]) antijoin[member.guild.id] = {
    onoff: 'Off'
  }
  if(antijoin[member.guild.id].onoff === 'Off') return;
  if(!member.user.bot) return;
    let accounttime = `${antijoin[member.guild.id].created}`
    let moment2 = require('moment-duration-format'),
        moment = require("moment"),
        date = moment.duration(new Date() - member.user.createdAt).format("d");
  
    if(date < accounttime) {
      member.ban(`Member account age is lower than ${antijoin[member.guild.id].created} days.`)
    }
  });
