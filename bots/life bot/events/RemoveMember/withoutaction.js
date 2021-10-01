var errors = 0;
exports.run = async function(client, member) {
    if(premium_servers.includes(member.guild.id)) return;
            var result = sql.query(`SELECT * FROM logs WHERE guildid = ${member.guild.id}`)
            var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${member.guild.id}`)

            if(!result.length) return;
            if(member.guild.me.hasPermission( 'VIEW_AUDIT_LOG' )) { 
            if(result[0].kickuser == 1) {
                member.guild.fetchAuditLogs().then(logs => {
                if(logs.entries.first().action == "MEMBER_KICK") {

                if(result[0].author == 0) {

                    const embed = new discord.RichEmbed()
                    .setAuthor(  member.guild.name, member.guild.iconURL)
                    .setFooter(  member.guild.name, member.guild.iconURL)    
                    .setDescription(`**${member}  was kicked from the server   **`)
                    .setColor('#00FF00')
                    .setTimestamp();
                    if(chat[0]) { 
                        if(client.channels.has(chat[0].kickuser)) {
                            client.channels.get(chat[0].kickuser).send({embed}).catch(err => errors++);
                            } else {
                                client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                            } 
                            } else { 
                            client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                            }
        } 
    }
})
    }
    
    
    if(result[0].leaveuser == 1) {
        member.guild.fetchAuditLogs().then(logs => {

        if(logs.entries.first().action == "MEMBER_KICK") return;
        if(logs.entries.first().action == "MEMBER_PRUNE") return;
        if(logs.entries.first().action == "MEMBER_BAN_ADD") return;
console.log(logs.entries.first().action)
            const embed = new discord.RichEmbed()
            .setAuthor(  member.guild.name, member.guild.iconURL)
            .setFooter(  member.guild.name, member.guild.iconURL)    
                .setDescription(`**${member}  was leaved from the server  **`)
    .setColor('#00FF00')
    .setTimestamp();
    if(chat[0]) { 
        if(client.channels.has(chat[0].leaveuser)) {
            client.channels.get(chat[0].leaveuser).send({embed}).catch(err => errors++);
            } else {
                client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
            } 
            } else { 
            client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
            }
        })

        }
         
} else {


    const embed = new discord.RichEmbed()
    .setAuthor(  member.guild.name, member.guild.iconURL)
    .setFooter(  member.guild.name, member.guild.iconURL)    
        .setDescription(`**${member}  was leaved from the server  **`)
.setColor('#00FF00')
.setTimestamp();
if(chat[0]) { 
if(client.channels.has(chat[0].leaveuser)) {
    client.channels.get(chat[0].leaveuser).send({embed}).catch(err => errors++);
    } else {
        client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
    } 
    } else { 
    client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
    }

}        
};
      