var errors = 0;
function getDays(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}
exports.run = (client, member) => {
if(premium_servers.includes(member.guild.id)) return;
var logs = sql.query(`SELECT * FROM logs WHERE guildid = ${member.guild.id}`)
var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${member.guild.id}`)
if(!logs.length) return;
if(logs[0].joinuser == 1 ) {

        const embed = new discord.RichEmbed()
           .setAuthor(  member.guild.name, member.guild.iconURL)
        .setFooter(  member.guild.name, member.guild.iconURL)  
        .setDescription(  member + "** Joined to server  account created from  " + getDays(member.user.createdTimestamp,Date.now()) + '**')
        .setColor('#00FF00')
        .setTimestamp();
        if(chat[0]) { 
            if(client.channels.has(chat[0].joinuser)) {
                client.channels.get(chat[0].joinuser).send({embed}).catch(err => errors++);
                } else {
                    client.channels.get(logs[0].chat).send({embed}).catch(err => errors++);
                } 
                } else { 
                client.channels.get(logs[0].chat).send({embed}).catch(err => errors++);
                }
    }
};
