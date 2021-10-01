function checkid ( id ) {
    var result = sql.query(`SELECT * FROM premium WHERE id = ${id}`)
    if(result[0]) {
        return "id";
    } else {
    var result2 = sql.query(`SELECT * FROM premium WHERE botid = ${id}`)
     if(result2[0]) {
            return "botid";
    } else {
    var result3 = sql.query(`SELECT * FROM premium WHERE guild = ${id}`)
     if(result3[0]) {
                return "guild";
      } else {
   }
  }
 }
}

var status2 = { };
var msgs = { };
exports.run = async (client, message, args, cmd) => {
// #vip
if(!args[0]) { 
if(client.user.id == main_config.bot.botid) return;
var result = sql.query(`SELECT * FROM premium WHERE botid = ${client.user.id}`); 
if(message.author.id == message.guild.ownerID || message.author.id == result[0].ownerid ) {
var endDate = new Date(result[0].enddate)
message.channel.send(`**Premium ID :** ${result[0].id} \n**Premium ends** :  ${countdown( new Date(endDate) ).toString()} \n**Registered for:** <@${message.guild.ownerID}>,<@${result[0].ownerid}> `)
}
}
// #vip restart
if(args[0] == "restart") {
    if(client.user.id == main_config.bot.botid) return;
    if(!message.guild) return;
    var result = sql.query(`SELECT * FROM premium WHERE botid = ${client.user.id}`);
    if(message.author.id == message.guild.ownerID || message.author.id == result[0].ownerid ) {
       message.channel.send("**:timer: Restarting ...**");
       process.exit(1);
    }
}
// #vip move
if(args[0] == "move") {
if(message.guild) return;
var id = args[1];
if(!id) {
message.channel.send('**:x: هذا الأمر يعمل على البرميوم فقط، اذا تعذر الوصول لبوت البرميوم بأمكانك كتابة الأمر متبوعاً بايدي البوت أو رقمه**')
} else { 
var result = sql.query(`SELECT * FROM premium WHERE ${checkid(id)} = ${id}`);
if(!result[0]) {
message.channel.send('**:x: أنت لاتمتلك صلاحية على هذا البوت**')

} else {
           
if(result[0].ownerid == message.author.id) { 
sql.query(`UPDATE premium SET move = 1 WHERE ${checkid(id)} = ${id}`);
message.channel.send('** :white_check_mark: بأمكانك نقل البوت عن طريق الرابط المرسل لك على الخاص، علماً ان مهلة الرابط تنتهي خلال 10 دقائق ويتطلب عليك طلب الرابط مرة اخرى **')
message.channel.send('https://discordapp.com/oauth2/authorize?client_id=522108492799279104&scope=bot&permissions=2080374975').then(m => {
setTimeout( function ( ) { 
sql.query(`UPDATE premium SET move = 0 WHERE ${checkid(id)} = ${id}`);
m.edit('أنتهت مدة الرابط');
}, 1000 * 60 * 10 )
})
} else {
message.channel.send('**:x: أنت لاتمتلك صلاحية على هذا البوت**')
            }
        }
    }
}
// change username 
var user = [ 'username', 'user', 'u', 'usern', 'name']
var avatar = [ 'avatar']
var status = [ 'status', 's', 'game','g'];
if(user.includes(args[0])) {
if(!args[1]) return;
if(client.user.id == main_config.bot.botid) return;
if(!message.guild) return;
var result = sql.query(`SELECT * FROM premium WHERE botid = ${client.user.id}`);
if(message.author.id == message.guild.ownerID || message.author.id == result[0].ownerid ) {
var username = message.content.replace(`#vip ${args[0]}`, '');
client.user.setUsername(username)
.then(m => {
    message.channel.send('** Username changed :white_check_mark: ** ').then(m => { setTimeout( function ( ) {  m.delete( ) }, 5000)})
})
.catch(err => {
if(err.message == 'Invalid Form Body\nusername: You are changing your username or Discord Tag too fast. Try again later.') {
    message.channel.send(" **:x: You can't change your username right now, wait.** ")
}
if(err.message == 'Invalid Form Body\nusername: Too many users have this username, please try another.') { 
message.channel.send(' ** :x: Too many users have this username, try anthor.** ')
}
})

}
      }
      // change avatar 
if(avatar.includes(args[0])) {
if(client.user.id == main_config.bot.botid) return;
if(!message.guild) return;
var result = sql.query(`SELECT * FROM premium WHERE botid = ${client.user.id}`);
if(message.author.id == message.guild.ownerID || message.author.id == result[0].ownerid ) {
    var msgmap = message.attachments.map(m => {
        if(!m) {
if(!args[1]) return; 
client.user.setAvatar(args[1])
.then(m => message.channel.send('** Avatar changed :white_check_mark: ** ').then(m => { setTimeout( function ( ) {  m.delete( ) }, 5000)}))
    .catch(err => {
        console.log(err);
    if(err.code == 50035) { 
        message.channel.send(' ** Error avatar not changed please check your avatar.** ')
    }
})

} else {
    client.user.setAvatar(m.url)
    .then(m => message.channel.send('** Avatar changed :white_check_mark: ** ').then(m => { setTimeout( function ( ) {  m.delete( ) }, 5000)}))
    .catch(err => {
        console.log(err)
        if(err.code == 50035) { 
            message.channel.send(' ** Error avatar not changed please check your avatar.** ')
        }
    })
    }
    })


}
}
// change game
if(status.includes(args[0])) {
    if(client.user.id == main_config.bot.botid) return;
    if(!message.guild) return;
    var result = sql.query(`SELECT * FROM premium WHERE botid = ${client.user.id}`);
    if(message.author.id == message.guild.ownerID || message.author.id == result[0].ownerid ) {
     var game = message.content.replace(`${getResult(message.guild.id)}vip ${args[0]}`, '');

     if(!args[1]) {
         message.channel.send(':white_check_mark: Your bot status has been removed.')
         client.user.setPresence({ game: { name: ''} })
        } else { 

        
    let embed = new discord.RichEmbed()
    .setDescription('** Select one: ** \n **[1]** Playing \n **[2]** Streaming \n **[3]** Listening \n **[4]** Watching \n **[0] Cancel** ')
    .setColor("BLACK");
    message.channel.sendEmbed(embed).then(m => msgs[message.guild.id] = m.id);
    author = message.author.id;
    status2[message.guild.id] = { };
    status2[message.guild.id][author] = game
    
    awaitMSG('0', message.author.id, message.guild.id, cmd)
    awaitMSG('1', message.author.id, message.guild.id, cmd)
    awaitMSG('2', message.author.id, message.guild.id, cmd)
    awaitMSG('3', message.author.id, message.guild.id, cmd)
    awaitMSG('4', message.author.id, message.guild.id, cmd)

        }        
}
}
}
    
exports.await = async (client, message, cmd ) => {
if(client.user.id == main_config.bot.botid) return;
if(!message.guild) return;
var result = sql.query(`SELECT * FROM premium WHERE botid = ${client.user.id}`);
if(message.author.id == message.guild.ownerID || message.author.id == result[0].ownerid ) {
if(message.content == 0 ) { 
delete status2[message.guild.id][message.author.id];
message.channel.fetchMessage(msgs[message.guild.id]).then(m => m.edit('**:white_check_mark: done**').then(m => m.delete(5000)))
}
if(message.content == 1) {
client.user.setPresence({ game: { name: status2[message.guild.id][message.author.id] } })
message.channel.fetchMessage(msgs[message.guild.id]).then(m => m.edit('**:white_check_mark: done**').then(m => m.delete(5000)))
}
if(message.content == 2 ) {
    message.channel.fetchMessage(msgs[message.guild.id]).then(m => m.edit('Specifiy a twitch channel url:'));
awaitMSG('3', message.author.id, message.guild.id, cmd)
}
if(message.content == 3) {
    client.user.setPresence({ game: { name: status2[message.guild.id][message.author.id], type: 'LISTENING' } })
    message.channel.fetchMessage(msgs[message.guild.id]).then(m => m.edit('**:white_check_mark: done**').then(m => m.delete(5000)))
}
if(message.content == 4) {
    client.user.setPresence({ game: { name: status2[message.guild.id][message.author.id], type: 'WATCHING' } })
    message.channel.fetchMessage(msgs[message.guild.id]).then(m => m.edit('**:white_check_mark: done**').then(m => m.delete(5000)))
}
let links = message.content.match(/(https:\/\/)?(www\.)?(twitch\.tv|twitch\.tv|twitch\.tv|twitch\.tv)\/([a-z0-9-.]+)?/i);
if (links) {
    client.user.setPresence({ game: { name: status2[message.guild.id][message.author.id].replace(links[0], ''), type: 'STREAMING',  url: links[0]} })
    message.channel.fetchMessage(msgs[message.guild.id]).then(m => m.edit('**:white_check_mark: done**').then(m => m.delete(5000)))
    
}

}


}
          
exports.settings = {
"name": "vip",
"sub-names": [],
"server": false,
"owneronly": false,
"premium": false,
"permissions": [  ],
"perMsg": "",
"description": "  امر مخصص للمشتركين للتحكم بالبوت.",
"group": 3
}  