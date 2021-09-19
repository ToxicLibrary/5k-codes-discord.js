
const afk = require('./afk.json');
client.on('message',async rebel => {
      if(rebel.author.bot) return;
  if (afk[rebel.author.id]) {
    delete afk[rebel.author.id];
    if (rebel.member.nickname === null) {
rebel.channel.send(" , <@"+rebel.author.id+"> I Try To Remove Afk Mode For You.");     } else {
      rebel.member.setNickname(rebel.member.nickname.replace(/(\[AFK\])/,''));
      rebel.channel.send(" , <@"+rebel.author.id+"> Your Afk Has Been Removed Becouse You Back.");
    }
    fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {if (err) console.error(err);});
} else {
    if (rebel.content.startsWith(prefix + 'afk ')||rebel.content === prefix + 'afk') {
      rebel.member.setNickname("[AFK] " + rebel.member.displayName);
      let args1 = rebel.content.split(' ').slice(1);
      if (args1.length === 0) {
        afk[rebel.author.id] = {"reason": true};
        rebel.reply("** You Are In Afk Mode **")
      } else {
        afk[rebel.author.id] = {"reason": args1.join(" ")}; // with reason
        rebel.reply("You Are In Afk Mode Becouse "+ args1.join(" ") + ".")
      }
      fs.writeFile("./afk.json", JSON.stringify(afk), (err) => {if (err) console.error(err);});
  }
}
         var mentionned = rebel.mentions.users.first();
if(rebel.mentions.users.size > 0) return ;
if (afk[rebel.mentions.users.first()]) {
if (afk[rebel.mentions.users.first()].reason === true) {
rebel.channel.send(`**<@!${mentionned.id}> In Afk Mode** `);
}else{
rebel.channel.send(`**<@!${mentionned.username}> In Afk Mode Reason: \n ${afk[rebel.mentions.users.first().id].reason}**`);
}
}
});
