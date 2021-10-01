var data_message = { };
var guilds = { };
var reactions = { };

module.exports = async (client) => {
checkReaction = (d) => {
if(!reactions[d.guild_id]) {
    var result = sql.query(`SELECT * FROM guilds WHERE id = ${d.guild_id}`);
    if(!result.length) return;
    if(result[0].msgid !== 0 ){ 
        reactions[d.guild_id] = {
            'msgid': result[0].msgid,
            'roleid': result[0].roleid,
            'reaction': result[0].reaction
        }
    if(d.message_id == reactions[d.guild_id]['msgid']) {
        if(d.emoji.name == reactions[d.guild_id]['reaction']) {
            return true;
        }
        delete reactions[d.guild_id]
    }
    }
} 
}
checkUser = (id, message) => {
  var result = sql.query(`SELECT * FROM ticketsusers WHERE user = ${id} AND guild = ${message.guild.id} AND open = 1`);
  if(!result.length) return false;
  var c;
  for (i = 0; i < result.length; i++) {
    c = message.guild.channels.find( c => c.id == result[i].text);
   if(c) return true;
   
  }
setTimeout( function( ) {
if(!c) return;
}, 500)
}
awaitReply = async (msg, question) => {
client.on('message', message => { 
    if(message.content == question) {
        return true;
    }
})
  };
    calect = (ms) => {
        const math = ms > 0 ? Math.floor : Math.ceil;
            days = math(ms / 86400000),
            hours =  math(ms / 3600000) % 24
            minutes = math(ms / 60000) % 60
            seconds = math(ms / 1000) % 60
    if(days) {
        return `${days}:${hours}:${minutes}:${seconds}`
    } 
    if(days == 0) {
        return `${hours}:${minutes}:${seconds}`
    }
    if(hours == 0) {
        return `${minutes}:${seconds}`
    }
    if(minutes == 0) {
        return `${seconds}`
    }
        }
setprefix = (id, prefix) => {
    guilds[id] = {
        'prefix': prefix   
    }
}
getResult = (id) => {
if(guilds[id]) {
  return guilds[id].prefix;
} else {
    var result = sql.query(`SELECT * FROM guilds WHERE id = ${id}`);
    if(!result.length) return '#';
    if(!result[0].prefix ) {
    guilds[id] = {
        'prefix': "#"
    }
    return '#';
    } else {
        guilds[id] = {
    'prefix': result[0].prefix
    }
    return result[0].prefix;
    }
setInterval( function ( ) {
var result = sql.query(`SELECT * FROM guilds WHERE id = ${id}`);
if(!result.length) return '#';
if(!result[0].prefix ) {
guilds[id] = {
    'prefix': "#"
}
return '#';
} else {
    guilds[id] = {

'prefix': result[0].prefix
}
return result[0].prefix;
}
}, 1000*60)
}
}
}
