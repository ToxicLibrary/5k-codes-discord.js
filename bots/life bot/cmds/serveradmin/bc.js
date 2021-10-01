var msgs = { };
var bcs = { };
exports.run = async (client, message, args, cmd) => {
    console.log('test')
    if(!args[0]) return message.channel.send('**:rolling_eyes: Please specify the broadcast message**');
    let embed = new discord.RichEmbed()
    .setDescription('** Select one: ** \n **[1]** All Members \n **[2]** Online Members \n **[3]** Specific Roles \n **[0] Cancel** ')
    .setColor("BLACK");
    message.channel.sendEmbed(embed).then(m => msgs[message.guild.id] = m.id);
    awaitMSG('1', message.author.id, message.guild.id, cmd)
    bcs[message.guild.id] = message;
   
}
       
exports.run = async(client, msg, cmd) => {
if(msg.content == 1) { 

}
}
      
exports.settings = {
"name": "bc",
"sub-names": [],
"premium": false,
"server": false,
"owneronly": false,
"permissions": [  ],
"perMsg": "",
"description": "لـ ارسال رسالة جماعية .",
"group": 3
}  