exports.run = async (client, message, args) => {
    var r = sql.query(`SELECT * FROM premium WHERE guild = ${message.guild.id}`);
    if(!r) return;
    if(premium_servers.includes(message.guild.id)) { 
    var index = premium_servers.indexOf(message.guild.id);

    if (index > -1) {
        premium_servers.splice(index, 1);
    }
} else {
premium_servers.push(message.guild.id)
}
}
       
      
      
exports.settings = {
"name": "run",
"sub-names": [],
"premium": false,
"server": true,
"owneronly": true,
"permissions": [ "ADMINISTRATOR" ],
"perMsg": "",
"description": "لـ اقفال / تشغيل البرميوم.",
"group": 3
}  