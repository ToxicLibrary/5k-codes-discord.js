const voice = JSON.parse(fs.readFileSync("./voiceState.json", "utf8"));
client.on('message', async message => {
if(message.author.bot) return;
if (message.channel.guild) {
if (message.content === '-myV') {
message.channel.send(`Your XP : ${voice[message.member.id].xp}
Your Level : ${voice[message.member.id].level}`);
      fs.writeFile('./voiceState.json', JSON.stringify(voice, null, 4), (e) => {
        if(e) console.log(e);
      });
}}});
 
  var returned;
hero.on('voiceStateUpdate', (user, member) => {
  if(member.selfDeaf || member.selfMute || member.serverDeaf || member.serverMute) {
    returned = false;
  }
  if(!member.selfDeaf || !member.selfMute ||!member.serverDeaf || !member.serverMute) {
    returned = true;
  }
  setInterval(() => {
    if(returned === true) {
      if(member.bot) return;
      if(!member.voiceChannel) returned = false;
      if(!voice[member.id]) voice[member.id] = {
        xp: 1,
        level: 1
      };
      voice[member.id] = {
        xp: voice[member.id].xp + Math.floor(Math.random() * 4) + 1,
        level: voice[member.id].level
      };
      var curXp = voice[member.id].xp;
      var curLvl = voice[member.id].level;
      if(curXp >= 300) {
        voice[member.id] = {
          xp: 1,
          level: curLvl + 1
        };
      }
      fs.writeFile('./voiceState.json', JSON.stringify(voice, null, 4), (e) => {
        if(e) console.log(e);
      });
    } else if(returned === false) {
      return null;
    }
  },5000);
});