var errors = 0;
exports.run = async function(client, oR, nR) {
    if(premium_servers.includes(oR.guild.id)) return;
    var result = sql.query(`SELECT * FROM logs WHERE guildid = ${oR.guild.id}`)
    var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${oR.guild.id}`)
    if(!result.length) return;
    if(result[0].updaterole == 1) {
            
        if(result[0].author == 1) {
          if(!oR.guild.me.hasPermission( 'VIEW_AUDIT_LOG' )) return;
          oR.guild.fetchAuditLogs().then(logs => {
              const ser = logs.entries.first().executor;
              if(oR.name !== nR.name) {
          
                   const embed = new discord.RichEmbed()
                  .setAuthor(ser.tag, ser.displayAvatarURL)
                  .setDescription('Role name has been changed \n  **Old Name**: ' + oR.name + '  \n **New name:** ' + nR.name + ' \n **by: ** ' + ser + '   ')
                  .setColor('#00FF00')
                  .setFooter(ser.tag, ser.displayAvatarURL)
                  .setTimestamp();

                  if(chat[0]) { 
                      if(client.channels.has(chat[0].updaterole)) {
                          client.channels.get(chat[0].updaterole).send({embed}).catch(err => errors++);
                          } else {
                              client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                          } 
                          } else { 
                          client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                          }
                  }
        })
      
      }

  }
};
      