var errors = 0;
exports.run = async (client, message) => {
    if(premium_servers.includes(message.guild.id)) return;
    var result = sql.query(`SELECT * FROM logs WHERE guildid = ${message.guild.id}`)
    var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${message.guild.id}`)
if(!result.length) return;
if(result[0]) {
    if(result[0].deletemsg == 1) {
        if(result[0].author == 1) {
            if(!message.guild.me.hasPermission( 'VIEW_AUDIT_LOG' )) return;
            message.guild.fetchAuditLogs().then(logs => {
        const ser = logs.entries.first().executor;
        if(ser.id == client.user.id) return;
            const embed = new discord.RichEmbed()
            .setAuthor(  message.guild.name, message.guild.iconURL)
            .setFooter(  message.guild.name, message.guild.iconURL)  
                            .setDescription("``" + message.content + "`` **was deleted \n by " + ser +"  \n author of message " + message.author.tag + " ** ")
            .setColor('#00FF00')
            .setTimestamp();
            if(chat[0]) { 
                if(client.channels.has(chat[0].deletemsg)) {
                    client.channels.get(chat[0].deletemsg).send({embed}).catch(err => errors++);
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

};
      