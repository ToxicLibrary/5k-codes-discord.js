client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
    newUsers[guild.id].set(member.id, member.user);
  
    if (newUsers[guild.id].size > 2) {
      const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
      guild.channels.get(guild.id).send("Welcome our new users!\n" + userlist);
      newUsers[guild.id].clear();
    }
  });
  
  client.on("guildMemberRemove", (member) => {
    const guild = member.guild;
    if (newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
  });
  