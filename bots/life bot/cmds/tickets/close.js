exports.run = async (client, message, args) => {
var password = args[0]; 
var result = sql.query(`SELECT * FROM ticketsusers WHERE password = '${password}' AND user = ${message.author.id} AND guild = ${message.guild.id} AND open = 1`)
if(!result.length) return message.channel.send(':x: ** لايوجد تذكرة بهذا الرمز**');
if(result[0].category == 1) {
    if(result[0].voice !== 0 ) {
        var category = message.guild.channels.get(result[0].category)
        var voice = message.guild.channels.get(result[0].voice)
        var text = message.guild.channels.get(result[0].text)
        let embed = new discord.RichEmbed()
                    .setAuthor(`قم بكتآبة موافق لديك 20 ثانيه`)
                    .setColor("RANDOM");
                    message.channel.sendEmbed(embed) .then(codes => {
 
                   
                        message.channel.awaitMessages(response => response.content === 'موافق', {
                            max: 1,
                            time: 20000,
                            errors: ['time']
                        })
                        .then((collect) => {
                            category.delete(' Ticket Deleted.');
                            voice.delete(' Ticket Delete.');
                            text.delete(' Ticket Delete.');
sql.query(`UPDATE ticketsusers SET open = 0 WHERE password = '${password}' AND user = ${message.author.id} AND guild = ${message.guild.id} AND open = 1 `)
                        }) .catch(() => {
                            codes.delete()
                                .then(message.channel.send('**تم إلغاء العملية**')) .then((c) => {
                                    c.delete(4000);
                                })
                                   
                           
                        })
 
 
                    })

    } else {
        var category = message.guild.channels.get(result[0].category)
        var text = message.guild.channels.get(result[0].text)
        let embed = new discord.RichEmbed()
        .setAuthor(`قم بكتآبة موافق لديك 20 ثانيه`)
        .setColor("RANDOM");
                    message.channel.sendEmbed(embed) .then(codes => {
 
                   
                        const filter = msg => msg.content.startsWith( 'موافق');
                        message.channel.awaitMessages(response => response.content === 'موافق', {
                            max: 1,
                            time: 20000,
                            errors: ['time']
                        })
                        .then((collect) => {
                            category.delete(' Ticket Deleted.');
                            text.delete(' Ticket Delete.');
                          sql.query(`UPDATE ticketsusers SET open = 0 WHERE password = '${password}' AND user = ${message.author.id} AND guild = ${message.guild.id} AND open = 1 `)
sql.query(`UPDATE ticketsusers SET open = 0 WHERE password = '${password}' AND user = ${message.author.id} AND guild = ${message.guild.id} AND open = 1 `)
                        }) .catch(() => {
                            codes.delete()
                                .then(message.channel.send('**تم إلغاء العملية**')) .then((c) => {
                                    c.delete(4000);
                                })
                                   
                            })
                        })
 

    }
} else {
    var text = message.guild.channels.get(result[0].text)
let embed = new discord.RichEmbed()
.setAuthor(`قم بكتآبة موافق لديك 20 ثانيه`)
.setColor("RANDOM");
message.channel.sendEmbed(embed) .then(codes => {


    const filter = msg => msg.content.startsWith('موافق');
    message.channel.awaitMessages(response => response.content === 'موافق', {
        max: 1,
        time: 20000,
        errors: ['time']
    })
    .then((collect) => {
        text.delete(' Ticket Delete.');
        sql.query(`UPDATE ticketsusers SET open = 0 WHERE password = '${password}' AND user = ${message.author.id} AND guild = ${message.guild.id} AND open = 1 `)
      }) .catch(() => {
        codes.delete()
            .then(message.channel.send('**تم إلغاء العملية**')) .then((c) => {
                c.delete(4000);
            })
               
        })
    })
}
}
    
    
    
exports.settings = {
        "name": "close",
        "sub-names": [ ],
        "server": true,
        "premium": false,
        "owneronly": false,
        "permissions": [  ],
        "perMsg": "",
        "description": "لـ اغلاق التذكرة. ",
        "group": 6
}  