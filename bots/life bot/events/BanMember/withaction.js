var errors = 0;
exports.run = async function(client, guild, user) {
    if(premium_servers.includes(guild.id)) return;

    var result = sql.query(`SELECT * FROM logs WHERE guildid = ${guild.id}`)
    var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${guild.id}`)

    if(result[0]) {
        if(result[0].addban == 1) {
            if(result[0].author == 1) {
                if(!guild.me.hasPermission( 'VIEW_AUDIT_LOG' )) return;
                guild.fetchAuditLogs().then(logs => {
            const ser = logs.entries.first().executor;
                const embed = new discord.RichEmbed()
                .setAuthor(  user.tag, user.avatarURL)
                .setFooter(  user.tag, user.avatarURL)
                .setDescription(`**${user} was banned \n by ${ser}   **`)
                .setColor('#00FF00')
                .setTimestamp();
                if(chat[0]) { 
                    if(client.channels.has(chat[0].addban)) {
                        client.channels.get(chat[0].addban).send({embed}).catch(err => errors++);
                        } else {
                            client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                        } 
                        } else { 
                        client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                        }
                    })

    }


	}
	}
}
  