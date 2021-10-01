function generatePassword() {
    var length = 4,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
var errors = 0;
exports.run = async (client, message, args) => {
var result = sql.query(`SELECT * FROM guilds WHERE id = ${message.guild.id}`);
var tickets = sql.query(`SELECT * FROM ticketsguilds WHERE id = ${message.guild.id}`)
var channels = sql.query(`SELECT * FROM channels WHERE id = ${message.guild.id} AND channel = ${message.channel.id}`)
if(!tickets.length) return;
if(!channels.length) return;
if(!result.length) return;
if(result[0].tickets == 0 ) return;
if(channels[0].ticket_act == 0) return;
if(!args[0]) return message.channel.send(':x: ** يجب ذكر سبب التذكرة**');
let reason = message.content.replace(getResult(message.guild.id) + 'new', '');
var password = generatePassword();
if(checkUser(message.author.id, message)) return message.channel.send('You have already ticket.')
if(tickets[0].category == 1) {
    if(tickets[0].voice == 1) {

        message.guild.createChannel(password, 'category').then(c => {
            var moderator = sql.query(`SELECT * FROM roles WHERE id = ${message.guild.id}`);
            for (i = 0; i < moderator.length; i++) {
           if(moderator[i].ticket == 1) {
            c.overwritePermissions(moderator[i].role, {
                READ_MESSAGES: null,
            });
           }
            }
            c.overwritePermissions(message.guild.id, {
                READ_MESSAGES: false,
            });
            c.overwritePermissions(message.author.id, {
                READ_MESSAGES: null,
            });
            message.guild.createChannel('ticket-' + password, 'text').then(cc => {
                cc.setParent(c.id);
                const embed = new discord.RichEmbed()
                .setAuthor(  message.member.user.tag,  message.member.user.avatarURL)
                .setFooter(   message.member.user.tag,  message.member.user.avatarURL)
                .setDescription('** New ticket password ``' + password +'`` \n if you need to close ticket write ``' + getResult(message.guild.id) +'close ' + password + '`` **')
                .setColor('#00FF00')
                .setTimestamp();
                cc.send({embed}).catch(err => errors++);
            
                message.guild.createChannel('ticket-' + password, 'voice').then(ccc => {
                ccc.setParent(c.id);
                ssql.query('INSERT INTO ticketsusers (user, guild, reason, category, voice, text, password) VALUES(?,?,?,?,?,?,?)', [message.author.id, message.guild.id, reason, c.id, ccc.id, cc.id, password], function (error, results, fields) {
                    if (error) throw error;
                })
                const embe2d = new discord.RichEmbed()
                .setAuthor(  message.member.user.tag,  message.member.user.avatarURL)
                .setFooter(   message.member.user.tag,  message.member.user.avatarURL)
                .setDescription('** new Ticket \n Username : ' + message.member.displayName + '``' + message.author.id + ' `` ' + ' (\n Password : ' + password + '  \n Reason : ' + reason + '  **')
                .setColor('#00FF00')
                .setTimestamp();
              if(tickets[0].logs !== 0) {
                  client.channels.get(tickets[0].logs).send({embe2d}).catch(err => errors++);
              }

                })
            })
        })
    } else {
        
        message.guild.createChannel(password, 'category').then(c => {
            var moderator = sql.query(`SELECT * FROM roles WHERE id = ${message.guild.id}`);
            for (i = 0; i < moderator.length; i++) {
           if(moderator[i].ticket == 1) {
            c.overwritePermissions(moderator[i].role, {
                READ_MESSAGES: null,
            });
           }
            }
            c.overwritePermissions(message.guild.id, {
                READ_MESSAGES: false,
            });
            c.overwritePermissions(message.author.id, {
                READ_MESSAGES: null,
            });
            message.guild.createChannel('ticket-' + password, 'text').then(cc => {
                cc.setParent(c.id);
                const embed = new discord.RichEmbed()
                .setAuthor(  message.member.user.tag,  message.member.user.avatarURL)
                .setFooter(   message.member.user.tag,  message.member.user.avatarURL)
                .setDescription('** New ticket password ``' + password +'`` \n if you need to close ticket write ``' + getResult(message.guild.id) +'close ' + password + '`` **')
                .setColor('#00FF00')
                .setTimestamp();
                cc.send({embed}).catch(err => errors++);
            
                const embed2 = new discord.RichEmbed()
                .setAuthor(  message.member.user.tag,  message.member.user.avatarURL)
                .setFooter(   message.member.user.tag,  message.member.user.avatarURL)
                .setDescription('** new Ticket \n Username : ' + message.member.displayName + '``' + message.author.id + ' `` ' + ' (\n Password : ' + password + '  \n Reason : ' + reason + '  **')
                .setColor('#00FF00')
                .setTimestamp();
              if(tickets[0].logs !== 0) {
                  client.channels.get(tickets[0].logs).send({embed2}).catch(err => errors++);
              }
              ssql.query('INSERT INTO ticketsusers (user, guild, reason, category, voice, text, password) VALUES(?,?,?,?,?,?,?)', [message.author.id, message.guild.id, reason, c.id, 0, cc.id, password], function (error, results, fields) {
                if (error) throw error;
            })
            })
        })
    }
} 
if(tickets[0].category !== 0) {
        var channel = message.guild.channels.get(tickets[0].category);
        if(!channel) return;
        message.guild.createChannel('ticket-' + password, 'text').then(cc => {
            cc.setParent(tickets[0].category);
            var moderator = sql.query(`SELECT * FROM roles WHERE id = ${message.guild.id}`);
            for (i = 0; i < moderator.length; i++) {
           if(moderator[i].ticket == 1) {
            cc.overwritePermissions(moderator[i].role, {
                READ_MESSAGES: null,
            });
           }
            }
            cc.overwritePermissions(message.guild.id, {
                READ_MESSAGES: false,
            });
            cc.overwritePermissions(message.author.id, {
                READ_MESSAGES: null,
            });
            const embed = new discord.RichEmbed()
            .setAuthor(  message.member.user.tag,  message.member.user.avatarURL)
            .setFooter(   message.member.user.tag,  message.member.user.avatarURL)
            .setDescription('** New ticket password ``' + password +'`` \n if you need to close ticket write ``' + getResult(message.guild.id) +'close ' + password + '`` **')
            .setColor('#00FF00')
            .setTimestamp();
            cc.send({embed}).catch(err => errors++);
        
            const embed3 = new discord.RichEmbed()
            .setAuthor(  message.member.user.tag,  message.member.user.avatarURL)
            .setFooter(   message.member.user.tag,  message.member.user.avatarURL)
            .setDescription('** new Ticket \n Username : ' + message.member.displayName + '``' + message.author.id + ' `` ' + ' (\n Password : ' + password + '  \n Reason : ' + reason + '  **')
            .setColor('#00FF00')
            .setTimestamp();
            console.log(tickets[0].logs)
            if(tickets[0].logs !== 0) {
              console.log('test')
              message.guild.channels.get(tickets[0].logs).send({embed3}).catch(err => errors++);
          }
          ssql.query('INSERT INTO ticketsusers (user, guild, reason, category, voice, text, password) VALUES(?,?,?,?,?,?,?)', [message.author.id, message.guild.id, reason, tickets[0].category, 0, cc.id, password], function (error, results, fields) {
            if (error) throw error;
        })
        })
    }
    if(tickets[0].category == 0) {
        message.guild.createChannel('ticket-' + password, 'text').then(cc => {
            cc.overwritePermissions(message.guild.id, {
                READ_MESSAGES: false,
            });
            cc.overwritePermissions(message.author.id, {
                READ_MESSAGES: null,
            });
            const embed = new discord.RichEmbed()
            .setAuthor(  message.member.user.tag,  message.member.user.avatarURL)
            .setFooter(   message.member.user.tag,  message.member.user.avatarURL)
            .setDescription('** New ticket password ``' + password +'`` \n if you need to close ticket write ``' + getResult(message.guild.id) +'close ' + password + '`` **')
            .setColor('#00FF00')
            .setTimestamp();
            cc.send({embed}).catch(err => errors++);
        
            const embed4 = new discord.RichEmbed()
            .setAuthor(  message.member.user.tag,  message.member.user.avatarURL)
            .setFooter(   message.member.user.tag,  message.member.user.avatarURL)
            .setDescription('** new Ticket \n Username : ' + message.member.displayName + '``' + message.author.id + ' `` ' + ' (\n Password : ' + password + '  \n Reason : ' + reason + '  **')
            .setColor('#00FF00')
            .setTimestamp();
          if(tickets[0].logs !== 0) {
              client.channels.get(tickets[0].logs).send({embed4}).catch(err => errors++);
          }
          ssql.query('INSERT INTO ticketsusers (user, guild, reason, category, voice, text, password) VALUES(?,?,?,?,?,?,?)', [message.author.id, message.guild.id, reason, 0, 0, cc.id, password], function (error, results, fields) {
            if (error) throw error;
        })
        })
    }


}
    
    
    
exports.settings = {
        "name": "new",
        "sub-names": [ ],
        "server": true,
        "premium": false,
        "owneronly": false,
        "permissions": [  ],
        "perMsg": "",
        "description": "لـ انشاء تذكره جديدة ",
        "group": 6
}  