var erorrs = 0;
exports.run = async function(client, oM, nM) {
    if(premium_servers.includes(oM.guild.id)) return;
    var result = sql.query(`SELECT * FROM logs WHERE guildid = ${oM.guild.id}`)
    var chat = sql.query(`SELECT * FROM logschat WHERE guildid = ${oM.guild.id}`)
if(!result.length) return;
if(result[0].editmsg == 1) {
    if(oM.contnet === nM.content) return;
    if(oM.author.id == client.user.id) return;
    if(!oM.content ) return;
        const embed = new discord.RichEmbed()
        .setAuthor( oM.author.tag, oM.author.displayAvatarURL)
   // .setDescription("**:star2: Message updated  \n :x: OLD: ```html\n<content: " + oM.content + "> \n<author: " + oM.author.tag + "> ``` \n :white_check_mark: NEW: ```html\n<content: " + nM.content + "> \n<author: " + nM.author.tag + "> ```  \n by " +  nM.author + "   **")
   .setDescription("** :pencil2: Message sent by <@" + oM.author.id + "> edited in <#" + oM.channel.id + "> \n :x: OLD: ```\n " + oM.content + "``` \n :white_check_mark: NEW: ```\n " + nM.content + "```**")  
   .setColor('#00FF00')
   .setFooter( oM.author.tag, oM.author.displayAvatarURL)
        .setTimestamp();
        if(chat[0]) { 
            if(client.channels.has(chat[0].editmsg)) {
                client.channels.get(chat[0].editmsg).send({embed}).catch(err => errors++);
                } else {
                    client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                } 
                } else { 
                client.channels.get(result[0].chat).send({embed}).catch(err => errors++);
                }
   
}
};
      