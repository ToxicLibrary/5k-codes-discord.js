var users = {};
var numbers = {};
var time = {};
var good = {};
var already = [];

exports.run = (client, message, args) => {

    if(!args[0]) {
      let embed = new discord.RichEmbed()
      .setAuthor('📋 Role Managment ', message.author.displayAvatarURL)
      .setColor( "BLACK" )
      .setDescription( `** الاوامر ** \n ${getResult(message.guild.id)}role all+ 
      ${getResult(message.guild.id)}role all-
      ${getResult(message.guild.id)}role [user] [role]
      `)
      .setFooter(  message.member.displayName)
      .setTimestamp()
    message.channel.send({embed})
    } else { 
    if(message.mentions.users.first()) { 
      var member =  message.guild.members.get(message.mentions.users.first().id);
    var role = message.content.split(' ').slice(2).join(" ").toLowerCase(); 
    if(role.startsWith('+')) {
      role.split('+')
      console.log('yes')
      var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
console.log(role1.name) 
    } else {
      console.log('no')
    }
    var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
    
   member.addRole(role1);
    message.channel.send(`:white_check_mark: Changed roles for ${member.displayName}, **+${role1.name}**.`)
    }
    }
  }


exports.settings = {
    "name": "role",
    "sub-names": [ ],
    "server": true,
    "premium": false,
    "owneronly": true,
    "permissions": [ "MANAGE_ROLES" ],
    "perMsg": "",
    "description": "لـ اعطاء الاعضاء رول ",
    "group": 2
}  