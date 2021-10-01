exports.run = async (client, message, args) => {
    var prefix2 = getResult(message.guild.id);
var prefix = message.content.replace(prefix2 + 'setprefix', '');
console.log(args[0])
if(!args[0]) return;
message.channel.send('تم تغيير امر البوت الى ' + args[0]).then(m => setTimeout( function (  ) { m.delete()}, 3000))
setprefix(message.guild.id, args[0])
ssql.query(`UPDATE guilds SET prefix = ? WHERE id = ${message.guild.id}`, [args[0]], function(err, results) {

})
}
       
       
       
exports.settings = {
     "name": "setprefix",
     "sub-names": [ ],
     "server": true,
     "premium": false,
     "owneronly": false,
     "permissions": [ "ADMINISTRATOR" ],
     "perMsg": "",
     "description": "لـ تغيير امر البوت. ",
     "group": 2
}  