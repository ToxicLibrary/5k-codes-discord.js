exports.run = async (client, message, args) => {
if(args[0] == 'on') {
    sql.query(`UPDATE guilds SET links = 1 WHERE id = ${message.guild.id}`)
    message.channel.send(':white_check_mark: - ** تم منع ارسال الروابط**')

}
if(args[0] == 'off') {
    sql.query(`UPDATE guilds SET links = 0 WHERE id = ${message.guild.id} `)
    message.channel.send(':white_check_mark: - ** تم اقفال منع ارسال الروابط**')
}
if(args[0] == "adminon") {
    sql.query(`UPDATE guilds SET linkadmin = 1 WHERE id = ${message.guild.id} `)
    message.channel.send(' :white_check_mark: - ** تم الغاء منع ارسال الروابط عن طريق الاداره.** ')

}
if(args[0] == "adminoff") {
    sql.query(`UPDATE guilds SET linkadmin = 0 WHERE id = ${message.guild.id} `)
   message.channel.send(' :white_check_mark: - ** تم  منع ارسال الروابط عن طريق الاداره.** ')

}
   }
   
   
   
   exports.settings = {
       "name": "blink",
       "sub-names": [ ],
       "server": true,
       "premium": false,
       "owneronly": false,
       "permissions": [ "ADMINISTRATOR" ],
       "perMsg": "",
       "description": "لـ حظر الروابط بالسيرفر. ",
       "group": 2
   }  