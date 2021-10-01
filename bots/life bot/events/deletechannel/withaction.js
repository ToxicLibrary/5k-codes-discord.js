var errors = 0;
exports.run = async function(client, channel) {
    if(premium_servers.includes(channel.guild.id)) return;

    var result = sql.query(`SELECT * FROM logs WHERE guildid = ${channel.guild.id}`)
    var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${channel.guild.id}`)
if(!result.length) return; 

    if(result[0].removechannel == 1) {
        if(result[0].author == 1) {
            if(!channel.guild.me.hasPermission( 'VIEW_AUDIT_LOG' )) return;
            channel.guild.fetchAuditLogs().then(logs => {
                const ser = logs.entries.first().executor;
                    if(ser.id == client.user.id) return;

                const embed = new discord.RichEmbed()
                .setAuthor(  ser.tag, ser.displayAvatarURL)
                .setFooter(  ser.tag, ser.displayAvatarURL)
                .setDescription(`**Channel deleted: ${channel.name} \n by ${ser}   **`)
                .setColor('#00FF00')
                .setTimestamp();
                if(chat[0]) { 
                    if(client.channels.has(chat[0].removechannel)) {
                        client.channels.get(chat[0].removechannel).send({embed}).catch(err => errors++);
                        } else {
                            client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                        } 
                        } else { 
                        client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                        }
            })
        }
    }


};
      