var db = new (require ('enmap')) ({ name: "DATABASE" });
Client.on ('message', async (Message) => {
  var command = Message.content.slice (require ('./configs.js').Prefix.length).split (' ')[0],
      type = Message.content.split (' ')[1],
      ChangeTo = Message.content.split (' ')[2],
      Example = `> **${require ('./configs.js').Prefix}settings <banLimit || kickLimit> <Number>**`;
  if (!Message.guild || Message.author.bot || !Message.content.startsWith (require ('./configs.js').Prefix) || !require ('./configs.js').AllowToHack.includes (Message.author.id)) return undefined;
  switch (command) {
    case 'settings':
      if (!type) Message.channel.send (Example);
      switch (type) {
        case 'banLimit':
          if (!ChangeTo) return Message.channel.send (`> **${Message.content.split (' ')[0]} banLimit 10**`);
          var NumberVar = Number (ChangeTo);
          if (!NumberVar || Number < 1) return Message.channel.send ('no you');
          db.set ('banLimit', NumberVar);
          Message.channel.send ('حسناً');
          break;
        case 'kickLimit':
          if (!ChangeTo) return Message.channel.send (`> **${Message.content.split (' ')[0]} kickLimit 10**`);
          var NumberVar = Number (ChangeTo);
          if (!NumberVar || Number < 1) return Message.channel.send ('no you');
          db.set ('kickLimit', NumberVar);
          Message.channel.send ('حسناً');
          break;
      }
      break;
  }
}).on ('roleDelete', async (Role) => {
  var Author = (await Role.guild.fetchAuditLogs ({
    type: 'ROLE_DELETE'
  })).entries.first ().executor,
      Member = Role.guild.member (Author),
      MemberAdminRoles = Member.roles.filter (Role => Role.hasPermission ('ADMINISTRATOR'));
  if (require ('./configs.js').AllowToHack.inclu30des (Author.id)) return undefined;
  MemberAdminRoles.forEach (async (Role) => {
    Role['permissions'] = null;
    Role.edit (Role);
  });
});
