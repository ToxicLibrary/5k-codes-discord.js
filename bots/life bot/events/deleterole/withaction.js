var errors =0;
exports.run = async function(client, role) {
    if(premium_servers.includes(role.guild.id)) return;
    var result = sql.query(`SELECT * FROM logs WHERE guildid = ${role.guild.id}`)
    var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${role.guild.id}`)
if(!result.length) return;
if(result[0].removerole == 1) {
    if(result[0].author == 1) {
        role.guild.fetchAuditLogs().then(logs => {
            const ser = logs.entries.first().executor;
            const embed = new discord.RichEmbed()
            .setAuthor(role.guild.name, role.guild.iconURL)
            .setDescription(":family_mmb: ``" + role.name + "`` **  role has been deleted \n by " + ser + " ** ")
            .setColor('#00FF00')
            .setFooter(role.guild.name, role.guild.iconURL)
            .setTimestamp();
            if(chat[0]) { 
                if(client.channels.has(chat[0].removerole)) {
                    client.channels.get(chat[0].removerole).send({embed}).catch(err => errors++);
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
      