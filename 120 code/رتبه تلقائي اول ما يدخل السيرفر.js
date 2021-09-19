client.on('guildMemberAdd', member=> {
    member.addRole(member.guild.roles.find("name","اسم الرتبه"));
    });