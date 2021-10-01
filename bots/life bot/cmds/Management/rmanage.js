
var msgs = { };

exports.run = async (client, message, args, cmd) => {
if(!args[0]) {
let embed = new discord.RichEmbed()
.setDescription('** Select one: ** \n **[1]** لـ تعيين رسالة الرياكشن \n **[2]** لـ تعيين الرياكشن \n **[3]** لـ تعيين الرتبة  \n **[0] للخروج** ')
.setColor("BLACK");
message.channel.sendEmbed(embed)
awaitMSG('1', message.author.id, message.guild.id, cmd)
}
}


exports.await = async (client, message, cmd ) => {
if(message.content == 1) {
message.channel.send('** قم بـ ارسال ايدي الرسالة ** ').then(m => {
if(!msgs[message.guild.id]) msgs[message.guild.id] = { };
if(!msgs[message.guild.id][message.author.id]) msgs[message.guild.id][message.author.id] = { };
awaitMSG('1', message.author.id, message.guild.id, cmd)
msgs[message.guild.id][message.author.id] = { 
    'true': true,
    'id': m.id,
    'id2': '1'
}
})
}
if(message.content == 2) {
    message.channel.send('** قم بوضع الرياكشن :gem: ** ').then(m => {
awaitReaction(message.author.id, message.guild.id, m.id);
})
}
if(message.content == 3) {
    message.channel.send('** سوي منشن لـ رول  ** ').then(m => {
    if(!msgs[message.guild.id]) msgs[message.guild.id] = { };
    if(!msgs[message.guild.id][message.author.id]) msgs[message.guild.id][message.author.id] = { };
    awaitMSG('1', message.author.id, message.guild.id, cmd)
    msgs[message.guild.id][message.author.id] = { 
        'true': true,
        'id': m.id,
        'id2': '3'
}
})
}
if(msgs[message.guild.id]) {
    if(msgs[message.guild.id][message.author.id]) {
        if(msgs[message.guild.id][message.author.id].id2 == 1) {
            message.channel.fetchMessage(message.content)
            .then(m => {
                message.channel.fetchMessage(msgs[message.guild.id][message.author.id].id).then( m => m.edit('**:white_check_mark: done**').then(mm => mm.delete(5000)) )
                sql.query(`UPDATE guilds SET msgid = ${message.content} WHERE id = ${message.guild.id}`)

            })
            .catch(e => {
                message.channel.fetchMessage(msgs[message.guild.id][message.author.id].id).then( m => m.edit(' **Canceled**').then(mm => mm.delete(5000)) )
            })
        }

        if(msgs[message.guild.id][message.author.id].id2 == 3) {
            var r = message.mentions.roles.first( )
            if(!r) return message.channel.fetchMessage(msgs[message.guild.id][message.author.id].id).then( m => m.edit(' **Canceled**').then(mm => mm.delete(5000)) );
            sql.query(`UPDATE guilds SET roleid = ${r.id} WHERE id = ${message.guild.id}`);
            message.channel.fetchMessage(msgs[message.guild.id][message.author.id].id).then( m => m.edit('**:white_check_mark: done**').then(mm => mm.delete(5000)) )

            }
    }
}
}
              
              
exports.settings = {
     "name": "rmanage",
     "sub-names": [],
     "server": true,
     "owneronly": false,
     "premium": false,
     "permissions": [  ],
     "perMsg": "",
     "description": "لـ تعديل اوامر الرياكشن رول",
     "group": 4
}  