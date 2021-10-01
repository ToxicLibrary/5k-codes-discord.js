var errors =0;
exports.run = async function(client, channel) {
    if(premium_servers.includes(channel.guild.id)) return;

    var result = sql.query(`SELECT * FROM logs WHERE guildid = ${channel.guild.id}`)
    var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${channel.guild.id}`)
if(result.length) {
    if(result[0].removechannel == 1) {
        if(result[0].author == 0) {
            const embed = new discord.RichEmbed()
            .setDescription(`**Channel deleted: ${channel.name}  **`)
            .setColor('#00FF00')
            .setAuthor(  channel.guild.name, channel.guild.iconURL)
            .setFooter(  channel.guild.name, channel.guild.iconURL)
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
        }
    }
}

};
      