var errors = 0;
var time = { };

exports.run = (client, oM, nM ) => {
  if(premium_servers.includes(oM.guild.id)) return;
  var result = sql.query(`SELECT * FROM logs WHERE guildid = ${oM.guild.id}`)
  var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${oM.guild.id}`)
  if(!result.length) return; 
  if(oM.voiceChannelID) { 
      if(nM.voiceChannelID) { 
          if(oM.selfDeaf !== nM.selfDeaf) { 
              if(nM.selfDeaf == true) { 
                  if(result[0].mutedefean == 1) { 
                      if(time[oM.id]) return;
                      const embed = new discord.RichEmbed()
                      .setAuthor(  client.users.get(oM.id).tag, client.users.get(oM.id).avatarURL)
                  .setDescription("<@" + oM.id + ">** is now muted speaker :speaker:  .**")  
                  .setColor('#00FF00')
                  .setFooter(  client.users.get(oM.id).tag, client.users.get(oM.id).avatarURL)
                      .setTimestamp();
                      if(chat[0]) { 
                          if(client.channels.has(chat[0].mutedefean)) {
                              client.channels.get(chat[0].mutedefean).send({embed}).catch(err => errors++);
                              } else {
                                  client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                              } 
                              } else { 
                              client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                              }
                              setTimeout( function ( ) { 
                              delete time[oM.id]; 
                              }, 3000)
                          }
                              } else {
                                  if(result[0].mutedefean == 1) { 
                                      if(time[oM.id]) return;
                                      const embed = new discord.RichEmbed()
                                      .setAuthor(  client.users.get(oM.id).tag, client.users.get(oM.id).avatarURL)
                                  .setDescription("<@" + oM.id + ">** is now un-muted speaker :speaker:  .**")  
                                  .setColor('#00FF00')
                                  .setFooter(  client.users.get(oM.id).tag, client.users.get(oM.id).avatarURL)
                                      .setTimestamp();
                                      if(chat[0]) { 
                                          if(client.channels.has(chat[0].mutedefean)) {
                                              client.channels.get(chat[0].mutedefean).send({embed}).catch(err => errors++);
                                              } else {
                                                  client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                                              } 
                                              } else { 
                                              client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                                              }
                                              time[oM.id] = true;
                                              setTimeout( function ( ) { 
                                                  delete time[oM.id]; 
                                                  }, 3000)
                                          }
      }
  }
      if(oM.selfMute !== nM.selfMute) { 
          if(nM.selfMute == true) { 
              if(result[0].mutedefean == 1) { 
                  if(time[oM.id]) return;
              const embed = new discord.RichEmbed()
              .setAuthor(  client.users.get(oM.id).tag, client.users.get(oM.id).avatarURL)
          .setDescription("<@" + oM.id + ">** is now muted microphone :microphone: .**")  
          .setColor('#00FF00')
          .setFooter(  client.users.get(oM.id).tag, client.users.get(oM.id).avatarURL)
              .setTimestamp();
              if(chat[0]) { 
                  if(client.channels.has(chat[0].mutedefean)) {
                      client.channels.get(chat[0].mutedefean).send({embed}).catch(err => errors++);
                      } else {
                          client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                      } 
                      } else { 
                      client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                      }
                      time[oM.id] = true;
                      setTimeout( function ( ) { 
                          delete time[oM.id]; 
                          }, 3000)
                  }
                              } else {
                                  if(result[0].mutedefean == 1) { 
                                      if(time[oM.id]) return;
                                  const embed = new discord.RichEmbed()
                                  .setAuthor(  client.users.get(oM.id).tag, client.users.get(oM.id).avatarURL)
                              .setDescription("<@" + oM.id + ">** is now un-muted microphone :microphone: .**")  
                              .setColor('#00FF00')
                              .setFooter(  client.users.get(oM.id).tag, client.users.get(oM.id).avatarURL)
                                  .setTimestamp();
                                  if(chat[0]) { 
                                      if(client.channels.has(chat[0].mutedefean)) {
                                          client.channels.get(chat[0].mutedefean).send({embed}).catch(err => errors++);
                                          } else {
                                              client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                                          } 
                                          } else { 
                                          client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                                          }
                                          time[oM.id] = true;
                                          setTimeout( function ( ) { 
                                              delete time[oM.id]; 
                                              }, 3000)
                                      }
                                  }

                                  
  }
  if(oM.voiceChannelID !== nM.voiceChannelID) {

  if(result[0].voiceonoff == 1 ) {
if(time[oM.id]) return;
      const embed = new discord.RichEmbed()
  .setAuthor(  client.users.get(oM.id).tag, client.users.get(oM.id).avatarURL)
.setDescription("<@" + oM.id + ">** switched voice channel \n ``" + client.channels.get(oM.voiceChannelID).name + "`` => ``" + client.channels.get(nM.voiceChannelID).name + "``.**")  
.setColor('#00FF00')
.setFooter(  client.users.get(oM.id).tag, client.users.get(oM.id).avatarURL)
  .setTimestamp();
  if(chat[0]) { 
      if(client.channels.has(chat[0].voiceonoff)) {
          client.channels.get(chat[0].voiceonoff).send({embed}).catch(err => errors++);
          } else {
              client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
          } 
          } else { 
          client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
          }
          time[oM.id] = true;
          setTimeout( function ( ) { 
              delete time[oM.id]; 
              }, 3000)

}
}
} else {
  if(result[0].voiceonoff == 1 ) {
      const embed = new discord.RichEmbed()
  .setAuthor(  client.users.get(oM.id).tag, client.users.get(oM.id).avatarURL)
.setDescription("<@" + oM.id + ">**  Leave from the voice \n :microphone: ``" + client.channels.get(oM.voiceChannelID).name + "``.**")  
.setColor('#00FF00')
.setFooter(  client.users.get(oM.id).tag, client.users.get(oM.id).avatarURL)
  .setTimestamp();
  if(chat[0]) { 
      if(client.channels.has(chat[0].voiceonoff)) {
          client.channels.get(chat[0].voiceonoff).send({embed}).catch(err => errors++);
          } else {
              client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
          } 
          } else { 
          client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
          }
          time[oM.id] = true;
          setTimeout( function ( ) { 
              delete time[oM.id]; 
              }, 3000)
      }
}
} else {
  if(result[0].voiceonoff == 1 ) {
      const embed = new discord.RichEmbed()
      .setAuthor(  client.users.get(oM.id).tag, client.users.get(oM.id).avatarURL)
  .setDescription("<@" + oM.id + ">**  Join to voice \n :microphone: ``" + client.channels.get(nM.voiceChannelID).name + "``.**")  
  .setColor('#00FF00')
  .setFooter(  client.users.get(oM.id).tag, client.users.get(oM.id).avatarURL)
      .setTimestamp();
      if(chat[0]) { 
      if(client.channels.has(chat[0].voiceonoff)) {
          client.channels.get(chat[0].voiceonoff).send({embed}).catch(err => errors++);
          } else {
              client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
          } 
          } else { 
          client.channels.get(result[0].chat).send({embed}).catch(err => errors++);

          }
          time[oM.id] = true;
          setTimeout( function ( ) { 
              delete time[oM.id]; 
              }, 3000)
          var c = sql.query(`SELECT * FROM channels WHERE id = ${oM.guild.id} AND channel = ${nM.voiceChannelID}`)
          if(!c.length) return;
          if(c[0].limtj == 1) {
              if(c[0].count < client.channels.get(nM.voiceChannelID).members.size) {
                  nM.guild.createChannel("kick_" + Math.floor(Math.random() * 770000000), 'voice')
.then(channel => {
  nM.setVoiceChannel(channel.id).then(r => {
  channel.delete();
  })
.catch(err => errors++);
})
              }
          }
      }

}
};
    