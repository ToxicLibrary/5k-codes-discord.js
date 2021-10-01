exports.run = async (client, message, args) => {
if(!args[0]) return message.channel.send(`** يرجى اختيار ** \n #setvoice name ( DEAFULT : Voice Online [00] ) \n #setvoice bots \n #setvoice on/off`)
var voice = sql.query(`SELECT * FROM voiceonline WHERE voiceguild = ${message.guild.id}`);
if(!voice.length) {
    message.guild.createChannel("Voice Online [00]", "voice").then(c => { 
    sql.query(`INSERT INTO voiceonline (voiceguild, voiceid, voicebots, voiceon, voicename) VALUES ( ${message.guild.id}, ${c.id}, 0, 1, "Voice Online[00]" )`)
    voice = sql.query(`SELECT * FROM voiceonline WHERE voiceguild = ${message.guild.id}`);
    })
}

if(args[0] == "name") { 
var name = message.content.replace('#setvoice name', '');
sql.query(`UPDATE voiceonline SET voicename = "${name}" WHERE voiceguild = ${message.guild.id}`);
message.channel.send(`** Voice Channel name has updated to **(${name}) `);
}
if(args[0] == "bots") { 
if(voice[0].voicebots == 0) { 
sql.query(`UPDATE voiceonline SET voicebots = 1 WHERE voiceguild = ${message.guild.id}`);
message.channel.send(`** Voice Channel bots has updated to **(:white_check_mark:) `);  
} else {
sql.query(`UPDATE voiceonline SET voicebots = 0 WHERE voiceguild = ${message.guild.id}`);
message.channel.send(`** Voice Channel bots has updated to **(:x:) `);
}
}
if(args[0] == "on") {
    var channel = message.guild.channels.get(voice[0].voiceid);
    if(!channel) {
message.guild.createChannel("Voice Online [00]", "voice").then(c => { 
sql.query(`UPDATE voiceonline SET voiceid = ${c.id} WHERE voiceguild = ${message.author.id}`);
sql.query(`UPDATE voiceonline SET voiceon = 1 WHERE voiceguild = ${message.author.id}`);

})
} else {
    sql.query(`UPDATE voiceonline SET voiceon = 1 WHERE voiceguild = ${message.author.id}`);

}
message.channel.send(`** Voice Online Activated :white_check_mark:**`)
}
if(args[0] == "off") {
sql.query(`UPDATE voiceonline SET voiceon = 0 WHERE voiceguild = ${message.author.id}`);
message.channel.send(`** Voice Online now is not enabled :x:**`)
}
}
   
   
   
exports.settings = {
       "name": "setvoice",
       "sub-names": [ ],
       "server": true,
       "premium": false,
       "owneronly": false,
       "permissions": [  ],
       "perMsg": "",
       "description": "لـ تحديد روم الفويس اون لاين ",
       "group": 2
}  