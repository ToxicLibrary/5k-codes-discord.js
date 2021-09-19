//CopyRights ToxicCodes 04/28/2019 🌠☭ 🕅ØŇŞŦ€Ř ҜƗŇᎶ 👺❦❧#8722
client.on("message", message =>{
  let command = message.content.split(" ")[0].slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  if(!message.content.startsWith(prefix)) return;
  if(message.author.bot) return;
  if(command === "welcome") {
      let welcomechann = args.join(" ");
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You must have the **`ADMINISTRATOR`** permission!")
      if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply("I must have the **`ADMINISTRATOR`** permissions!")
      if(!message.member.guild.channels.find(x => x.name === welcomechann)) return message.reply("Usage: **`(channel name)`**");
      message.reply("Successfully applied welcome to **`" + welcomechann + "`**")
      WelcomeChannel[message.guild.id] = {
          guild: message.guild.name,
          channel: welcomechann
      }
      fs.writeFile("./welcomer.json", JSON.stringify(WelcomeChannel, null, 4), err => {
          if(err) throw err;
  });
}
});
client.on('guildMemberAdd', async function (Monster) {
  const WelcomeChannelMK =  Monster.guild.channels.find(mk => mk.name === WelcomeChannel[Monster.guild.id].channel);
  if(!WelcomeChannelMK) return;
  Monster.guild.fetchInvites().then(guildInvites => {
      const uses = guildInvites.find(codes => codes.uses);
      const UserInvited = client.users.get(uses.inviter.id);
            let itsMe = client.emojis.find(copy => copy.name === "diamondmk");
            var EmbedWelcome = new Discord.RichEmbed()
            .setDescription(`${itsMe} __**New Member Joined**__
            ➤ Welcome <@${Monster.user.id}> To **${Monster.guild.name}**
            ➤ You Are Nr: **${Monster.guild.memberCount}**
            ➤ Invited By: <@${UserInvited.id}>`)
            .setColor('#383c41');
  const MKPIC = ['./imgs/w1.png'];
  let Image = Canvas.Image,
     CodesMK = new Canvas(400, 200),
     ctx = CodesMK.getContext('2d');
 fs.readFile(MKPIC, function (err, Background) {
     if (err) return console.log(err);
     let BG = Canvas.Image;
     let ground = new Image;
     ground.src = Background;
     ctx.drawImage(ground, 0, 0, 400, 200);
         let url = Monster.user.displayAvatarURL.endsWith(".webp") ? Monster.user.displayAvatarURL.slice(100) + ".png" : Monster.user.displayAvatarURL;
         jimp.read(url, (err, ava) => {
             if (err) return console.log(err);
             ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                 if (err) return console.log(err);
                  ctx.font = "bold 16px Arial";
                  ctx.fontSize = '20px';
                  ctx.fillStyle = "#f1f1f1";
                  ctx.textAlign = "center";
                  ctx.fillText(Monster.guild.name, 254, 67);
                  ctx.font = "bold 16px Arial";
                  ctx.fontSize = '20px';
                  ctx.fillStyle = "#f1f1f1";
                  ctx.textAlign = "center";
                  ctx.fillText(Monster.guild.memberCount, 338, 161);
                  ctx.font = "bold 16px Arial";
                  ctx.fontSize = '20px';
                  ctx.fillStyle = "#f1f1f1";
                  ctx.textAlign = "center";
                  ctx.fillText(Monster.user.username, 77, 183);
                  let Avatar = Canvas.Image;
                  let ava = new Avatar;
                  ava.src = buf;
                  ctx.beginPath();
                  ctx.arc(77, 101, 62, 0, Math.PI*2);
                  ctx.stroke();
                  ctx.clip();
                  ctx.drawImage(ava, 13, 38, 128, 126);
          WelcomeChannelMK.send({embed: EmbedWelcome, file: CodesMK.toBuffer()});
              })
          })
      });
  })
});//By 🌠☭ 🕅ØŇŞŦ€Ř ҜƗŇᎶ 👺❦❧#8722
//CopyRights ToxicCodes 04/28/2019 🌠☭ 🕅ØŇŞŦ€Ř ҜƗŇᎶ 👺❦❧#8722