var data = { };

exports.run = async (client, message, args) => {
    let member = message.guild.member(message.mentions.users.first());
    if(!member) return console.log('err')
    if(!data["like"]) {
        data["like"] = { };        
    }
    if(member.bot) return;
    if(message.author.bot) return;
    let id = message.author.id;
    if (!!data["like"][id] && (new Date).getTime() - data["like"][id] < 1000*60*60*24) {
        let r = (new Date).getTime() - data["like"][id];
        r = 1000*60*60*12 - r;
     let embed = new discord.RichEmbed()
     .setColor("000000")
        .setDescription(`:negative_squared_cross_mark: | لا يمكنك اعطاء لايك الان \n  | الوقت المتبقي : ${calect(r)} `)
        .setFooter('#' + message.guild.name + ' profile')
        .setAuthor(' المرسل: ' + message.author.username)
        message.channel.send({embed})
    } else {
 if(member) {
 if(member.user.bot) {
    message.channel.send(`:robot:  | **${message.author.username}**, bots do not have ranks!`)

} else {
if(member.id == message.author.id) {
let embed = new discord.RichEmbed()
           .setColor("000000")
           .setDescription(":negative_squared_cross_mark: | لايمكنك اعطاء نفسك لايك        ")
           .setFooter('#' + message.guild.name + ' profile')
           .setAuthor( message.author.username)
message.channel.send({embed})
} else {
var result = sql.query(`SELECT * FROM profile WHERE id = ${member.id}`);
if(!result.length) {
    sql.query(`INSERT INTO profile (id, xp, level, money, rep) VALUES ( ${member.id}, 0, 1,5000, 0 )`)
    result = sql.query(`SELECT * FROM profile WHERE id = ${member.id}`);
}
var i = result[0].rep+1;
sql.query(`UPDATE profile SET rep = ${i} WHERE id = ${member.id}`);
let embed = new discord.RichEmbed()
.setColor("000000")
.setDescription(`:white_check_mark: | لقد قمت باعطاء لايك بنجاح   \n  | الاسم : ${member} `)
.setFooter('#' + message.guild.name + ' profile')
.setAuthor(' المرسل: ' + message.author.username)
message.channel.send({embed})
data["like"][message.author.id] = (new Date).getTime()

}

}
} else { 
let embed = new discord.RichEmbed()
.setColor("000000")
.setDescription(" ```-like @<user> \n \n لـ اعطاء اعجاب``` ")
.setFooter('#' + message.guild.name + ' profile')
.setAuthor(' المرسل: ' + message.author.username)
message.channel.send({embed})
}
}
}
    
    
    
exports.settings = {
"name": "like",
"sub-names": [],
"server": true,
"owneronly": false,
"premium": false,
"permissions": [  ],
"perMsg": "",
"description": "لـ اعطاء شخص اعجاب",
"group": 5
}  