var errors = 0;
var data = { };

exports.run = async (client, message, args, cmd) => {
if(message.author.id !== message.guild.ownerID) return;
if(!args[0]) {
message.channel.send('** [1] => لـ تفعيل التذاكر بالكاتورج \n [2] => لـ تفعيل التذاكر بالفويس \n [3] => لـ تعيين كاتورج انشاء تذاكر \n [4] => لتعيين لوق التذاكر  \n [5] => لتحديد رومات لـ ارسال امر انشاء تذاكر \n [6] => لتعيين مشرفين التذاكر \n [7] => لتفعييل التذاكر \n [0] => للالغاء والطلوع من القائمة**')
awaitMSG('1', message.author.id, message.guild.id, cmd)
var tickets = sql.query(`SELECT * FROM ticketsguilds WHERE id = ${message.guild.id}`)
var tickets2 = sql.query(`SELECT * FROM guilds WHERE id = ${message.guild.id}`)
if(!tickets2.length) return;
if(!tickets.length) {
sql.query(`INSERT INTO ticketsguilds (id, category, voice, logs) VALUES (${message.guild.id}, 0, 0, 0) )`)   
}
} 


}
    
exports.await = async (client, message, cmd ) => {
    if(message.author.id !== message.guild.ownerID) return;
    if(message.content == 1 ) {
        var tickets = sql.query(`SELECT * FROM ticketsguilds WHERE id = ${message.guild.id}`)
        var tickets2 = sql.query(`SELECT * FROM guilds WHERE id = ${message.guild.id}`)
        if(!tickets2.length) return;
        if(!tickets.length) {
        sql.query(`INSERT INTO ticketsguilds (id, category, voice, logs) VALUES (${message.guild.id}, 0, 0, 0) )`)   
        sql.query(`UPDATE ticketsguilds SET category = 1 WHERE id = ${message.guild.id}`)
        message.channel.send('** تم التفعيل**.').then(m => m.delete(5000));
        } else {
        if(tickets[0].category !== 1 ) {
            sql.query(`UPDATE ticketsguilds SET category = 1 WHERE id = ${message.guild.id}`)
            message.channel.send('** تم التفعيل**.').then(m => m.delete(5000));
        }  else {
            sql.query(`UPDATE ticketsguilds SET category = 0  WHERE id = ${message.guild.id}`)
            message.channel.send('** تم الاغلاق**.').then(m => m.delete(5000));
        }
        }
    } 
    if(message.content == 2) {
        var tickets = sql.query(`SELECT * FROM ticketsguilds WHERE id = ${message.guild.id}`)
        var tickets2 = sql.query(`SELECT * FROM guilds WHERE id = ${message.guild.id}`)
        if(!tickets2.length) return;
        if(!tickets.length) {
        sql.query(`INSERT INTO ticketsguilds (id, category, voice, logs) VALUES (${message.guild.id}, 0, 0, 0) )`)   
        sql.query(`UPDATE ticketsguilds SET voice = 1 WHERE id = ${message.guild.id}`)
        message.channel.send('** تم التفعيل**.').then(m => m.delete(5000));
        } else {
        if(tickets[0].voice == 0 ) {
            sql.query(`UPDATE ticketsguilds SET voice = 1 WHERE id = ${message.guild.id}`)
            message.channel.send('** تم التفعيل**.').then(m => m.delete(5000));
        }  else {
            sql.query(`UPDATE ticketsguilds SET voice = 0  WHERE id = ${message.guild.id}`)
            message.channel.send('** تم الاغلاق**.').then(m => m.delete(5000));
        }
        }
    }
    if(message.content == 3 ){ 
        message.channel.send('**يرجى ارفاق الاسم**').then(m => {
            awaitMSG('7', message.author.id, message.guild.id, cmd)

            if(!data[message.guild.id]) data[message.guild.id] ={ };
            data[message.guild.id][message.author.id] = {
                'id': 3,
                'm': m.id
            }
        })
    }
    if(message.content == 4 ) { 
        message.channel.send('**يرجى عمل منشن للروم**').then(m => {
            awaitMSG('4', message.author.id, message.guild.id, cmd)

            if(!data[message.guild.id]) data[message.guild.id] ={ };
            data[message.guild.id][message.author.id] = {
                'id': 4,
                'm': m.id
            }
        })
    }
    if(message.content == 5) { 
        message.channel.send('**يرجى عمل منشن للرومات**').then(m => {
        awaitMSG('5', message.author.id, message.guild.id, cmd)

        if(!data[message.guild.id]) data[message.guild.id] ={ };
        data[message.guild.id][message.author.id] = {
            'id': 5,
            'm': m.id
        }
    })
    }
    if(message.content == 6) { 
        message.channel.send('**يجب عمل منشن لـ المشرفين**').then(m => {
        awaitMSG('5', message.author.id, message.guild.id, cmd)

        if(!data[message.guild.id]) data[message.guild.id] ={ };
        data[message.guild.id][message.author.id] = {
            'id': 6,
            'm': m.id
        }
    })
    }
    if(message.content == 7) {
        var tickets = sql.query(`SELECT * FROM ticketsguilds WHERE id = ${message.guild.id}`)
        var tickets2 = sql.query(`SELECT * FROM guilds WHERE id = ${message.guild.id}`)
        if(!tickets2.length) return;
        if(!tickets.length) {
        sql.query(`INSERT INTO ticketsguilds (id, category, voice, logs) VALUES (${message.guild.id}, 0, 0, 0) )`)   
        }
        if(tickets2[0].tickets == 0) {
            sql.query(`UPDATE guilds SET tickets = 1  WHERE id = ${message.guild.id}`)
        message.channel.send('** تم التفعيل**.').then(m => m.delete(5000));
        } else {
            sql.query(`UPDATE guilds SET tickets = 0  WHERE id = ${message.guild.id}`)
            message.channel.send('** تم الاغلاق**.').then(m => m.delete(5000));
        
        }
    }
    if(data[message.guild.id]) {
        if(!data[message.guild.id][message.author.id]) return;
        if(data[message.guild.id][message.author.id].id == 3) {
            var channel = message.guild.channels.filter(c => c.type == "category").find(c => c.name == message.content);
            if(!channel) return message.channel.fetchMessage(data[message.guild.id][message.author.id].m).then(m => m.edit('**:x: Channel not founded**').then(m => m.delete(5000)));
            sql.query(`UPDATE ticketsguilds SET category = ${channel.id} WHERE id = ${message.guild.id}`)
            message.channel.fetchMessage(data[message.guild.id][message.author.id].m).then(m => m.edit('**:white_check_mark: done**').then(m => m.delete(5000)));
        }
        if(data[message.guild.id][message.author.id].id == 4) {
            var c = message.mentions.channels.first( )
            if(!c) return message.channel.fetchMessage(data[message.guild.id][message.author.id].m).then(m => m.edit('**:x: Channel not founded**').then(m => m.delete(5000)));
            sql.query(`UPDATE ticketsguilds SET logs = ${c.id} WHERE id = ${message.guild.id}`)
            message.channel.fetchMessage(data[message.guild.id][message.author.id].m).then(m => m.edit('**:white_check_mark: done**').then(m => m.delete(5000)));
        }
        if(data[message.guild.id][message.author.id].id == 5) {
            var c = message.mentions.channels;
            if(!c) return   message.channel.fetchMessage(data[message.guild.id][message.author.id].m).then(m => m.edit('**:x: channels not founded canceled**').then(m => m.delete(5000)));

      c.forEach(cc => {
          
          var result = sql.query(`SELECT * FROM channels WHERE id = ${message.guild.id} AND channel = ${cc.id}`);
          if(!result.length) {
              sql.query(`INSERT INTO channels (id, channel, ticket_act) VALUES (${message.guild.id}, ${cc.id}, 1)`);
          } else {
            sql.query(`UPDATE channels SET ticket_act = 1 WHERE id = ${message.guild.id} AND channel = ${cc.id}`);
          }

      })
      message.channel.fetchMessage(data[message.guild.id][message.author.id].m).then(m => m.edit('**:white_check_mark: done**').then(m => m.delete(5000)));
    }
    if(data[message.guild.id][message.author.id].id == 6) {
        var c = message.mentions.roles;
        if(!c) return   message.channel.fetchMessage(data[message.guild.id][message.author.id].m).then(m => m.edit('**:x: Roles not founded canceled**').then(m => m.delete(5000)));
  c.forEach(cc => {
      var result = sql.query(`SELECT * FROM roles WHERE id = ${message.guild.id} AND role = ${cc.id}`);
      if(!result.length) {
          sql.query(`INSERT INTO roles (id, role, ticket) VALUES (${message.guild.id}, ${cc.id}, 1)`);
      } else {
        sql.query(`UPDATE roles SET ticket = 1 WHERE id = ${message.guild.id} AND role = ${cc.id}`);
      }

  })
  message.channel.fetchMessage(data[message.guild.id][message.author.id].m).then(m => m.edit('**:white_check_mark: done**').then(m => m.delete(5000)));
}
 delete data[message.guild.id][message.author.id];
}
}
    
exports.settings = {
    "name": "manage",
    "sub-names": [ ],
    "server": true,
    "premium": false,
    "owneronly": false,
    "permissions": [  ],
    "perMsg": "",
    "description": "لـ عمل اعدادات التذاكر ",
    "group": 6
}  