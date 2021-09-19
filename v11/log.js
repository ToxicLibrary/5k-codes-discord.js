const Discord = require(`discord.js`)
const dateformat = require('dateformat');
const bot = new Discord.Client();
bot.login(`NTIyMDgzOTcwOTIyMzE1Nzk3.DvF0iw.btooTPA0HDZCM9oRR-iUYFxUNPw`);

bot.on(`ready`, () => {
  console.log(`Log Bot | 0%`);
  console.log(bot.user.id);
})

bot.on(`guildMemberUpdate`, async (om, nm) => {
  if(!om || !om.id) return;

  const channel = nm.guild.channels.find(ch => ch.name == 'log')
  if(!channel) return console.log('I can\'t find it');



    om.guild.fetchAuditLogs()
    .then(async logs => {
      let user = logs.entries.first().executor
      let changes = logs.entries.first().changes


      if(om.roles.size < nm.roles.size) {

        let role = changes[0].new
        let name = role[0].name
        let id = role[0].id

        let embed = new Discord.RichEmbed()
        .setAuthor(`${nm.user.tag}`, nm.user.displayAvatarURL)
        .setTimestamp()
        .setDescription(`:white_check_mark: ${nm} was given the \`${name}\` role by ${user}`)

        channel.send("", { embed : embed } )

}
    if(om.roles.size > nm.roles.size) {

      let role = changes[0].new
      let name = role[0].name
      let id = role[0].id

      let embed = new Discord.RichEmbed()
      .setAuthor(`${nm.user.tag}`, nm.user.displayAvatarURL)
      .setTimestamp()
      .setDescription(`:negative_squared_cross_mark: ${nm} was removed from the \`${name}\` role by ${user}`)

      channel.send("", { embed : embed } )
    }

    if(om.nickname !== nm.nickname) {

      let embed = new Discord.RichEmbed()
      .setAuthor(`${nm.user.tag}`, nm.user.displayAvatarURL)
      .setTimestamp()
      .setDescription(`:white_check_mark: ${nm} nickname was changed by ${user}`)
      .addField('Old Nickname', `\`\`\`${om.nickname}\`\`\``)
      .addBlankField()
      .addField('New Nickname', `\`\`\`${nm.nickname}\`\`\``)

      channel.send("", { embed : embed } )
    }

  })

})



bot.on('channelCreate', (ch) => {
  console.log(ch);

  let guild = ch.guild

  let channel = guild.channels.find(ch => ch.name == 'log')
  if(!channel) return;

  guild.fetchAuditLogs()
  .then(logs => {

    let user = logs.entries.first().executor;
    let changes = logs.entries.first().changes;

    console.log(changes);

    let name = changes[0].new
    let typeNo = changes[1].new
    let perm;

    let type = '';

    if(typeNo == 0) {
      type = 'Text Channel'
    } else if (typeNo == 4) {
      type = 'Category Channel'
    } else if (typeNo == 2) {
      type = 'Voice Channel'
    }

    let embed = new Discord.RichEmbed()
    .setAuthor(`${user.tag}`, user.displayAvatarURL)
    .setTimestamp()
    .setDescription('Channel Created! By: ' + '<@' + user.id + '>')
    .addField('Name :', `${name}`, true)
    .addField('Type :', `${type}`, true)
  /*  if(typeNo == 0) {
    embed.addField('NSFW :', `${nsfw}`, true)
  } else if(typeNo === 2) {
    embed.addField('BitRate :', `${bit}`, true)
  }*/
    channel.send("", { embed : embed } )

  })
})

bot.on('channelUpdate', (oC, nC) => {

  //console.log(nC);

  let guild;
  guild = oC.guild;

  const channel = guild.channels.find(ch => ch.name == 'log')
  if(!channel) return;

  guild.fetchAuditLogs()
  .then(logs => {

    console.log(logs.entries.first())

    let user = logs.entries.first().executor;
    let changes = logs.entries.first().changes;

    console.log(changes)

    const embed = new Discord.RichEmbed()
    .setAuthor(`${guild.name}`)
    .setTimestamp()

    if(logs.entries.first().action == 'CHANNEL_OVERWRITE_CREATE') {
      let roleOrUser
      changes.forEach(change => {
        if(change.key == 'id') {
          if(changes[1].new == 'role') roleOrUser = `<@&${change.new}>`
          else if(changes[1].new == 'member') roleOrUser = `<@${change.new}>`
        } 
      })
      embed.setDescription(`${roleOrUser} Permissions has been added to ${nC} By ${user}`)
    }

    if(logs.entries.first().action == 'CHANNEL_OVERWRITE_DELETE') {
      let roleOrUser
      changes.forEach(change => {
        if(change.key == 'id') {
          if(changes[1].old == 'role') roleOrUser = `<@&${change.old}>`
          else if(changes[1].old == 'member') roleOrUser = `<@${change.old}>`
        } 
      })
      embed.setDescription(`${roleOrUser} Permissions has been deleted from ${nC} By ${user}`)
    }

    if(logs.entries.first().action == 'CHANNEL_UPDATE') {

    embed
    .setDescription(`**Channel <#${oC.id}> has been updated** by ${user}`)
    if(oC.name != nC.name) {
      embed.addField('Old Name',`${oC.name}`, true)
      embed.addField('New Name', `${nC.name}`, true)
    }
    if(oC.topic != nC.topic) {
      embed.addField('Old Topic', `${oC.topic ? oC.topic : 'Null'}`, true)
      embed.addField('New Topic', `${nC.topic ? nC.topic : 'Null'}`, true)
    }
    if(oC.nsfw != nC.nsfw) {
      embed.addField('NSFW:', nC.nsfw ? 'ON' : 'OFF');
    }
    changes.forEach(change => {
      if(change.key == 'rate_limit_per_user') {
        embed.addField('Old Slowmode Time:', `${change.old}`, true)
        embed.addField('New Slowmode Time:', `${change.new}`, true);
      }
    })
  }
  channel.send("", { embed : embed } )
  })

})

bot.on('channelDelete', ( ch ) => {

  let guild;
  while (!guild)
      guild = ch.guild


  const channel = guild.channels.find(ch => ch.name == 'log')
  if(!channel) return;

  guild.fetchAuditLogs()
  .then(logs => {

    const user = logs.entries.first().executor
    const changes = logs.entries.first().changes

    var type = '';

    if(ch.type === 'text') type = 'Text Channel'
    if(ch.type === 'voice') type = 'Voice Channel'
    if(ch.type === 'category') type = 'Category Channel'

    const embed = new Discord.RichEmbed()
    .setAuthor(`${guild.name}`, guild.iconURL)
    .setDescription(`**Channel ${ch.name} has been deleted** by ${user}`)
    .addField('Channel Name:', `${ch.name}`)
    .addField('Channel Type:', `${type}`)
    .setTimestamp()
    .setFooter(`${user.tag}`, user.displayAvatarURL)


    channel.send("", { embed : embed } )

  })

})

bot.on('roleCreate', (role) => {

  let guild;
  while (!guild)
    guild = role.guild

    const channel = guild.channels.find(ch => ch.name == 'log')
    if(!channel) return;

    guild.fetchAuditLogs()
    .then(logs => {

      const user = logs.entries.first().executor
      const changes = logs.entries.first().changes

      const embed = new Discord.RichEmbed()
      .setAuthor(`${guild.name}`, guild.iconURL)
      .setDescription(`**\`${role.name}\` role has been created** by ${user}`)
      .setTimestamp()
      .setFooter(`${user.tag}`, user.displayAvatarURL)

      channel.send("", { embed : embed } )

    })
})

bot.on('roleUpdate', (oR, nR) => {

  let guild;
    while (!guild)
      guild = oR.guild

      const channel = guild.channels.find(ch => ch.name == 'log')
      if(!channel) return;

      guild.fetchAuditLogs()
      .then(logs => {

        const user = logs.entries.first().executor
        const changes = logs.entries.first().changes

        console.log(changes);

        function colorToHexString(dColor) {
    return '#' + ("000000" + (((dColor & 0xFF) << 16) + (dColor & 0xFF00) + ((dColor >> 16) & 0xFF)).toString(16)).slice(-6);
          }

          if (oR.permissions != nR.permissions) {

            let perms = {
              added: [],
              removed: []
            }

            let newPerms = new Discord.Permissions(nR.permissions);
            let nArr = newPerms.toArray();

            let oldPerms = new Discord.Permissions(oR.permissions);
            let oArr = oldPerms.toArray();

            nArr.forEach(perm => {
              
              if(oArr.includes(perm)) return;

              else if(!oArr.includes(perm)) {
                perms.added.push(perm);
              } 

            })

            oArr.forEach(perm => {

              if(nArr.includes(perm)) return;

              else if(!nArr.includes(perm)) {
                perms.removed.push(perm);
              } 

            })

            const embed = new Discord.RichEmbed()
            .setDescription(`**${nR} role permissions has been updated** by: ${user}`);
            if(perms.added[0]) {
              let text = '';
              perms.added.map(p => text += `${p}\n`)
              embed.addField('Permissions Added:', `\`\`\`${text}\`\`\``);
            }

            if(perms.removed[0]) {
              let text = '';
              perms.removed.map(p => text += `${p}\n`)
              embed.addField('Permissions Removed:', `\`\`\`${text}\`\`\``);
            }

            embed.setColor(nR.hexColor)
            embed.setFooter(`${user.tag}`, user.displayAvatarURL)
            embed.setTimestamp()

            channel.send("", { embed: embed } )

          }

          if((oR.name !== nR.name) || (oR.hexColor !== nR.hexColor)) {

          const embed = new Discord.RichEmbed()
          .setDescription(`**${nR} role has been updated** by: ${user}`)
          if(oR.name !== nR.name) {
            embed.addField('Old Name:', `${oR.name}`)
            embed.addField('New Name:', `${nR.name}`)
          }
          if(oR.hexColor !== nR.hexColor) {
            embed.addField('Old Color:', `${oR.hexColor}`)
            embed.addField('New Color:', `${nR.hexColor}`)
          }



          embed.setColor(nR.hexColor)
          embed.setFooter(`${user.tag}`, user.displayAvatarURL)
          embed.setTimestamp()


          channel.send("", { embed : embed } )
}
      })
})

bot.on('roleDelete', (role) => {

  let guild;
    while (!guild)
      guild = role.guild

      var time = new Date()
      var mask = 'yyyy-mm-dd h:MM'

      var timestamp = dateformat(time, mask)

      const channel = guild.channels.find(ch => ch.name == 'log')
      if(!channel) return;

      guild.fetchAuditLogs()
      .then(logs => {

        const user = logs.entries.first().executor

        const embed = new Discord.RichEmbed()
        .setAuthor(`${guild.name}`, guild.iconURL)
        .setDescription(`**\`${role.name}\` has been deleted** by ${user}`)
        .setFooter(`${user.tag}`, user.displayAvatarURL)
        .setTimestamp()

        channel.send( { embed : embed } )

      })

})

bot.on('guildMemberRemove', (member) => {

  let guild;
  while (!guild)
    guild = member.guild

  let channel = guild.channels.find(ch => ch.name == 'log');
  if(!channel) return;

  guild.fetchAuditLogs()
  .then(logs => {
    let user = logs.entries.first().executor;
    let act = logs.entries.first().action;
    let reason = logs.entries.first().reason;

    let embed = new Discord.RichEmbed()
    .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
    .setTimestamp()


    if(act === 'MEMBER_BAN') {

      reason ? embed.addField('With Reason:', `\`\`\`${reason}\`\`\``) : '';

      embed.setDescription(`**${member} banned from the server!** by ${user}`)
      embed.setFooter(`${user.tag}`, user.displayAvatarURL)

  } else

  if(act === 'MEMBER_KICK') {

    reason ? embed.addField('With Reason:', reason) : '';

    embed.setDescription(`**${member} kicked from the server!** by ${user}`)
    embed.setFooter(`${user.tag}`, user.displayAvatarURL)

  }

  else {
    embed.setDescription(`**${member} has left server.**`)
  }

  channel.send( { embed : embed } )

  })

})

bot.on('messageDelete', (msg) => {

  var guild;
    while(!guild)
      guild = msg.guild;


    let channel = guild.channels.find(ch => ch.name == 'log');
    if(!channel) return;

    guild.fetchAuditLogs()
    .then(logs => {

      let user = logs.entries.first().executor;


      const embed = new Discord.RichEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
      .setTimestamp()
      .setDescription(`Message Deleted!${user == msg.author ? '' : ` by: ${user}`}`)
      .addField('Message Content:', `\`\`\`${msg.cleanContent}\`\`\``)

      channel.send( { embed : embed } )


    })

})

bot.on('messageUpdate', (oldmsg, newmsg) => {

  if(oldmsg.content == newmsg.content) return;

  var guild;
    while(!guild)
      guild = newmsg.guild;


    let channel = guild.channels.find(ch => ch.name == 'log');
    if(!channel) return;

    guild.fetchAuditLogs()
    .then(logs => {

      let user = logs.entries.first().executor;


      const embed = new Discord.RichEmbed()
      .setAuthor(`${newmsg.author.tag}`, newmsg.author.displayAvatarURL)
      .setTimestamp()
      .setDescription(`Message Updated!`)
      .addField('Old Message Content:', `\`\`\`${oldmsg.cleanContent}\`\`\``)
      .addField('New Message Content:', `\`\`\`${newmsg.cleanContent}\`\`\``)

      channel.send( { embed : embed } )


    })

})

bot.on('error', err => console.error(err))