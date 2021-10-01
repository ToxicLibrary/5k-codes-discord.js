exports.run = async (client, message, args) => {
  //  if( message.guild.me.hasPermission( 'MANAGE_GUILD' ) ) return;
var usees = 0;
    message.guild.fetchInvites()
    .then(invites => {
        invites.forEach(i => {
if(i.inviter.id == message.author.id) {
    usees += i.uses;
}   
     })
    })
    .catch(console.error);
setTimeout( function ( ) { 
message.channel.send(' **- عدد الدخول عن طريق روابطك : ``' + usees + ' ``**');
}, 3000)
}
    
    
    
exports.settings = {
        "name": "روابطي",
        "sub-names": [ ],
        "server": true,
        "premium": false,
        "owneronly": false,
        "permissions": [  ],
        "perMsg": "",
        "description": "لـ عرض عدد الدخول عن طريق رابطك ",
        "group": 2
}  