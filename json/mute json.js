client.on('message', async message => {
    let time = moment().format('Do MMMM YYYY , hh:mm');
    let adv = require('./mutes.json').state;
    let mutes = JSON.parse(fs.readFileSync("./mutes.json", "utf8"));
    let messageArray = message.content.split(" ");
   if(message.content.startsWith(prefix c "adv")) {
       if(!message.guild.member(message.author).hasPermission("! i???iCara_???Y??T | R??L???
#1484")) return message.channel.send("**- You don't have the needed permissions!**");
       if(!messageArray[1]) return message.reply("** Choose either enabled or disabled!**");
       
       if(messageArray[1] === 'enable') {
           message.channel.send('**Enabled AntiAdvertisment!**').then(() => {
    client.mutes = {
    guild: message.guild.name,
    time: time,
    state: true
  };
  fs.writeFile("./mutes.json", JSON.stringify(client.mutes, null, 4),err => {
  if(err) throw err;
  });
       })
       } else        if(messageArray[1] === 'disable') {
           message.channel.send('**Disabled AntiAdvertisment!**').then(() => {
    client.mutes = {
    guild: message.guild.name,
    time: time,
    state: false
  };
  fs.writeFile("./mutes.json", JSON.stringify(client.mutes, null, 4),err => {
  if(err) throw err;
  });
       })
   }
   }
});

client.on('message', async message => {
    let discord = ['discord'];
    let timer = '1h';
    let time = moment().format('Do MMMM YYYY , hh:mm');
    let adv = require('./mutes.json').state;
    let mutes = JSON.parse(fs.readFileSync("./mutes.json", "utf8"));
    let messageArray = message.content.split(" ");
    let link = messageArray.join(" ");
    let advRole = message.guild.roles.find("name", "Muted");
    if(adv === false) return;
    if(adv === true) {
        if(!advRole) return message.guild.createRole({
            name: "Muted",
            permissions: []
        });
    if(message.content.includes(discord)) return message.delete().then(() => {
       message.guild.member(message.author).addRole(advRole).then(() => {
           message.channel.sendMessage(`\`\`Name:\`\`\n${message.author}\n\n\`\`Duration:\`\`\n${timer}\n\n\`\`Muted at:\`\`\n${time}`);
           setTimeout(() => {
           message.guild.member(message.author).removeRole(advRole);
       }, mmss(timer))
       })
    });
    }
});
---------------------------------------------------------------------------------------------------------------------------------------------------------
البكجات : npm i moment || npm i file-system || npm i ms || npm i nodemon
سو ملف اسمه : mutes.json
عرف كل واحد : moment: moment || file-system: fs || ms: mmss
قبل اخر بكج :  npm install -g nodemon || npm install --save-dev nodemon
يوم تشغل البوت شغله ب : nodemon [ملف البوت].js
