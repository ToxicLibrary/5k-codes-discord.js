var errors = 0;
exports.run = async function(client, oldGuild, newGuild) {
        if(premium_servers.includes(oldGuild.id)) return;
    var result3 = sql.query(`SELECT * FROM logs WHERE guildid = ${oldGuild.id}`)
    var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${oldGuild.id}`)
    if(!result3.length) return;
    if(result3[0].editserver == 1 ) {
    if(result3[0].author == 1 ) {
        if(!oldGuild.me.hasPermission( 'VIEW_AUDIT_LOG' )) return;
        oldGuild.fetchAuditLogs().then(logs => {
            if(oldGuild.name !== newGuild.name) {
                if(oldGuild.region !== newGuild.region) {
                    const ser = logs.entries.first().executor;
                    const embed = new discord.RichEmbed()
                    .setAuthor(  oldGuild.name, oldGuild.iconURL)
                    .setFooter(  oldGuild.name, oldGuild.iconURL)    
                    .setDescription("**:star2: Server Settings have been updated  \n :x: OLD: ```html\n<name: " + oldGuild.name + "> \n<region: " + oldGuild.region + "> ``` \n :white_check_mark: NEW: ```html\n<name: " + newGuild.name + "> \n<region: " + newGuild.region + "> ``` \n by " +  ser + "   **")
                    .setColor('#00FF00')
                    .setTimestamp();
                    if(chat[0]) { 
                        if(client.channels.has(chat[0].editserver)) {
                            client.channels.get(chat[0].editserver).send({embed}).catch(err => errors++);
                            } else {
                                client.channels.get(result3[0].chat).send({embed}).catch(err => errors++);
                            } 
                            } else { 
                            client.channels.get(result3[0].chat).send({embed}).catch(err => errors++);
                            }
                } else {
            const ser = logs.entries.first().executor;
            const embed = new discord.RichEmbed()
            .setAuthor(  oldGuild.name, oldGuild.iconURL)
            .setFooter(  oldGuild.name, oldGuild.iconURL)  
                        .setDescription("**Guild Updated: \n  Old Name : " + oldGuild.name + " \n New name : ``" + newGuild.name + "`` \n by " +  ser + "   **")
            .setColor('#00FF00')
            .setTimestamp();
            if(chat[0]) { 
                if(client.channels.has(chat[0].editserver)) {
                    client.channels.get(chat[0].editserver).send({embed}).catch(err => errors++);
                    } else {
                        client.channels.get(result3[0].chat).send({embed}).catch(err => errors++);
                    } 
                    } else { 
                    client.channels.get(result3[0].chat).send({embed}).catch(err => errors++);
                    }
                }     
        }
     
        })

    
    }
    }
};
      