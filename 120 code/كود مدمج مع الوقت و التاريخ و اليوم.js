const moment = require('moment');//npm install moment
client.on('message', message => {
             var prefix = "$"
if (message.content.startsWith(prefix + "time")) {
let user = message.mentions.users.first();
var args = message.content.split(" ").slice(1);
var men = message.mentions.users.first();
var heg;
if(men) {
heg = men
} else {
heg = message.author
}
var mentionned = message.mentions.members.first();
var h;
if(mentionned) {
h = mentionned
} else {
h = message.member
}
moment.locale('ar-TN'); //TN
var id = new  Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`${heg.username}#${heg.discriminator} `,heg.avatarURL)
.setDescription([`**الوقت**${moment().format('HH:mm:ss A')}${moment().format('YYYY/M/D')}**اليوم** :${moment().format('dddd')}**التاريخ**`])
message.channel.send(id)
};
});