var errors = 0;

exports.run = async function(client, channel) {
    if(!channel.guild) return;
    if(premium_servers.includes(channel.guild.id)) return;
    var result = sql.query(`SELECT * FROM logs WHERE guildid = ${channel.guild.id}`)
    var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${channel.guild.id}`)

    if(result[0]) {
        if(result[0].newchannel == 1) {
            if(result[0].author == 1) {
                if(!channel.guild.me.hasPermission( 'VIEW_AUDIT_LOG' )) return;
                channel.guild.fetchAuditLogs().then(logs => {
                    const ser = logs.entries.first().executor;
                    if(ser.id == client.user.id) return;
                
                    if(channel.type == "text") {
                    const embed = new discord.RichEmbed()
                    .setAuthor(  channel.guild.name, channel.guild.iconURL)
                    .setFooter(  channel.guild.name, channel.guild.iconURL)
                    .setDescription(`**Channel Created:  :pencil: #${channel.name} <#${channel.id}> \n by ${ser}   **`)
                    .setColor('#00FF00')
                    .setTimestamp();
                    if(chat[0]) { 
                        if(client.channels.has(chat[0].newchannel)) {
                            client.channels.get(chat[0].newchannel).send({embed}).catch(err => errors++);
                            } else {
                                client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                            } 
                            } else { 
                            client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                            }
                        }
                    if(channel.type == "voice") {
                        const embed = new discord.RichEmbed()
                        .setAuthor(  channel.guild.name, channel.guild.iconURL)
                        .setFooter(  channel.guild.name, channel.guild.iconURL)
                        .setDescription(`**Channel Created: :microscope: ${channel.name}\n by ${ser}   **`)
                        .setColor('#00FF00')
                        .setTimestamp();
                        if(chat[0]) { 
                            if(client.channels.has(chat[0].newchannel)) {
                                client.channels.get(chat[0].newchannel).send({embed}).catch(err => errors++);
                                } else {
                                    client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                                } 
                                } else { 
                                client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                                }
                    }
                    if(channel.type == "category") {
                        const embed = new discord.RichEmbed()
                        .setAuthor(  channel.guild.name, channel.guild.iconURL)
                        .setFooter(  channel.guild.name, channel.guild.iconURL)
                        .setDescription(`**Channel Created: ${channel.name} \n by ${ser} **`)
                        .setColor('#00FF00')
                        .setTimestamp();
                        if(chat[0]) { 
                            if(client.channels.has(chat[0].newchannel)) {
                                client.channels.get(chat[0].newchannel).send({embed}).catch(err => errors++);
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
	}
}
  