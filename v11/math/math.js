client.on('message', message => {
	  if(message.author.bot) return;
      if (!points[message.author.id]) points[message.author.id] = {
             points: 0,id: message.author.id
           };
    if (message.content.startsWith(prefix + 'math')) {
      if(!message.channel.guild) return message.reply('**This Command For Servers Only**').then(m => m.delete(3000));
    
    const type = require('./math.json');
    const item = type[Math.floor(Math.random() * type.length)];
    const filter = response => {
        return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
    };
    message.channel.send('**You have 15 seconds to resolve the question**').then(msg => {
 const w = ['./img/w1.png'];//الخافيه
            let Image = Canvas.Image,
            canvas = new Canvas(400, 150),
            ctx = canvas.getContext('2d');
    
            fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 400, 150);
 
});
 let url = message.author.displayAvatarURL.endsWith(".webp") ? message.author.displayAvatarURL.slice(5, -20) + ".png" : message.author.displayAvatarURL;
               jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);
                       
                      
                        ctx.font = '15px Arial';
                              ctx.fontSize = '10px';
                              ctx.fillStyle = "#FFFFFF";
                              ctx.textAlign = "center";
              ctx.fillText(`${item.type} ` , 250, 100);
              
               let Avatar = Canvas.Image;
                              let ava = new Avatar;
                              ava.src = buf;
                              ctx.beginPath();
                              ctx.arc(70, 80, 63, 0, Math.PI*2);
                                 ctx.closePath();
                                 ctx.clip();
                                 ctx.drawImage(ava, 8, 18, 128, 126);   
message.channel.sendFile(canvas.toBuffer());
 })
             
                       message.channel.awaitMessages(filter,{
               thing: true,
               maxMatches : 1,
                time : 60000,
                 maxUses: 1,
                errors : ['time']
            })//وقت الاجابة
                      .then((collected) => {
                           var embed = new Discord.RichEmbed()
                            .setDescription(`${collected.first().author} ✅ **Well done I was able to answer his equation quickly**`)
                 message.channel.send(embed);
                  console.log(`[Typing] ${collected.first().author} typed the word.`);
                          let won = collected.first().author;
                          points[won.id].points++;
                        })
                        .catch(collected => {
                       var embed1 = new Discord.RichEmbed()
                            .setDescription(`:x: **No one was able to solve the equation in time**`)
                 message.channel.send(embed1);
                    console.log('[Typing] Error: No one type the word.');
           
                  })
                })
             
  })
}

});