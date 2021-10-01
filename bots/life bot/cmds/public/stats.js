//require("moment-duration-format");  
 // const { Canvas } = require("canvas-constructor"); 
//const fetch = require("node-fetch"); 
exports.run = async (client, message) => {
  const duration = moment.duration(client.uptime).format(" D [d], H [h], m [m], s [s]");
async function img() {
var background = await fetch('https://cdn.discordapp.com/attachments/467864239873458236/570716800933953566/test.png' );
var image = await background.buffer();
 return new Canvas(708, 160)
.addImage(image, 0, 0, 708, 160).setTextAlign('center')
.setColor('#FFFFFF')
.setTextFont('18pt Impact')
.addResponsiveText('0.0.1', 165, 75)
.addResponsiveText((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB', 165, 145)
.addText(duration, 570, 145, 112)
.addText(client.guilds.size, 370, 75)
.addText('0', 370, 145, 112)
.addText(client.users.size, 570, 75, 112)

.toBuffer();
}
    const buffer = await img();
    const filename = `stats-bot.jpg`;
    const attachment = new discord.Attachment(buffer, filename);
    await message.channel.send(attachment);
}



exports.settings = {
    "name": "stats",
    "sub-names": [  ],
    "server": true,
    "premium": false,
    "owneronly": false,
    "permissions": [  ],
    "perMsg": "",
    "description": "لـ عرض احصائيات البوت ",
    "group": 2
}  