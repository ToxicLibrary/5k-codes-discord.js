const fs = require('fs')
const Canvas = require('canvas')
const jimp = require('jimp')
const moment = require('moment')
const prefix = 'البريفكس';

client.on('message', message => {
    
    let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);
    let guild = (client, message).guild;
     let user = message.mentions.users.first();
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
       moment.locale('ar-TN');
{
  let args = message.content.split(" ").slice(1);
if(command == "id") {
    var Canvas = require('canvas')
  , Image = new Canvas.Image
  , canvas = new Canvas(450, 170)
  , ctx = canvas.getContext('2d');
  ctx.font = '15px Impact';
  
Image.src = canvas.toBuffer();


    
ctx.drawImage(Image, 0, 0, Image.width / 470, Image.height / 170);
ctx.fillText(`${moment(heg.createdTimestamp).fromNow()}`,90, 20);
ctx.fillText(`${moment(h.joinedAt).fromNow()}`,110, 70);
ctx.fillText(`${heg.username}`,70, 40);
ctx.fillText(`${h.presence.status}`,50, 70);


ctx.beginPath();
ctx.lineTo(50, 102);
ctx.stroke();



message.channel.sendFile(canvas.toBuffer());
}
}
});

