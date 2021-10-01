var errors = 0;
exports.run = async (client, message, args) => {
//if(message.author.id !== message.guild.ownerID) return;
if(args[0] == "bans") {
    message.guild.fetchBans()
     .then(bans => {
         bans.forEach(b => {
             message.guild.unban(b.id)
         })
         message.channel.send(' :white_check_mark: - **All banned was removed**')
     })  
     .catch( err => errors++);
}
if(args[0] == "mutes") {
    var mutes = sql.query(`SELECT * FROM usersmute WHERE server = ${message.guild.id}`);
    for (let i = 0; i < mutes.length; i++) {
        var guild = client.guilds.get(mutes[i].server);
        var mm = guild.members.get(mutes[i].user);
    
        if(mutes[i].type == "Text") {
        let role = guild.roles.find(r => r.name === "Mute");
        if(role) { 
            if(mm.roles.has(role.id)) {
             mm.removeRole(role.id);
             sql.query(`UPDATE usersmute SET muted = 0 WHERE id = ${mutes[i].id}`)
            } else {
                sql.query(`UPDATE usersmute SET muted = 0 WHERE id = ${mutes[i].id}`)
        
            }
        
        } else {
            sql.query(`UPDATE usersmute SET muted = 0 WHERE id = ${mutes[i].id}`)
        
        }
            } else {
                let role = guild.roles.find(r => r.name === "MuteV");
        if(role) { 
            if(mm.roles.has(role.id)) {
             mm.removeRole(role.id);
             sql.query(`UPDATE usersmute SET muted = 0 WHERE id = ${mutes[i].id}`)
            } else {
                sql.query(`UPDATE usersmute SET muted = 0 WHERE id = ${mutes[i].id}`)
        
            }
        
        } else {
            sql.query(`UPDATE usersmute SET muted = 0 WHERE id = ${mutes[i].id}`)
        
        } 
            }
        }
}
if(args[0] == "points") {
sql.query(`DELETE FROM points WHERE guild = ${message.guild.id}`);

}
}
   
   
   
exports.settings = {
       "name": "removeall",
       "sub-names": [ ],
       "server": true,
       "premium": false,
       "owneronly": true,
       "permissions": [  ],
       "perMsg": "",
       "description": "لـ تصفير النقاط, الميوت, الباندات. ",
       "group": 2
}  