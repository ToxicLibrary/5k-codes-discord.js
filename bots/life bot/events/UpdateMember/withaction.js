var errors = 0;
exports.run = ( client, mold, mnew ) =>  {
    if(premium_servers.includes(mold.guild.id)) return;
    var result = sql.query(`SELECT * FROM logs WHERE guildid = ${mnew.guild.id}`)
    var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${mnew.guild.id}`)
    if(!result.length) return;
    if (mold.roles.array().length < mnew.roles.array().length) {
        var role = mnew.roles.find(r => mold.roles.find(r2 => r2.id == r.id) == null)
        if(result[0].addroleuser == 1 ) { 
        if(result[0].author == 1 ) {
            if(!mnew.guild.me.hasPermission( 'VIEW_AUDIT_LOG' )) return;
            mnew.guild.fetchAuditLogs().then(logs => {
                const ser = logs.entries.first().executor;
                const embed = new discord.RichEmbed()
                .setAuthor(  client.users.get(mnew.id).tag, client.users.get(mnew.id).avatarURL)
                .setDescription("** :white_check_mark: <@" + mnew.id + "> was given the ``" + role.name +"`` role by " + ser + " **")
                .setColor('#00FF00')
                .setFooter(  client.users.get(mnew.id).tag, client.users.get(mnew.id).avatarURL)
                .setTimestamp();
                if(chat[0]) { 
                    if(client.channels.has(chat[0].editserver)) {
                        client.channels.get(chat[0].editserver).send({embed}).catch(err => errors++);
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
else if (mold.roles.array().length > mnew.roles.array().length) {
    var role = mold.roles.find(r => mnew.roles.find(r2 => r2.id == r.id) == null)
    if(result[0].removeroleuser == 1 ) { 
    if(result[0].author == 1 ) {
        if(!mnew.guild.me.hasPermission( 'VIEW_AUDIT_LOG' )) return;
        mnew.guild.fetchAuditLogs().then(logs => {
            const ser = logs.entries.first().executor;
            const embed = new discord.RichEmbed()
            .setAuthor(  client.users.get(mnew.id).tag, client.users.get(mnew.id).avatarURL)
            .setDescription("** :x: <@" + mnew.id + "> was removed from the ``" + role.name +"`` role by " + ser + "**")
            .setColor('#00FF00')
            .setFooter(  client.users.get(mnew.id).tag, client.users.get(mnew.id).avatarURL)
            .setTimestamp();
            if(chat[0]) { 
                if(client.channels.has(chat[0].addroleuser)) {
                    client.channels.get(chat[0].addroleuser).send({embed}).catch(err => errors++);
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
      