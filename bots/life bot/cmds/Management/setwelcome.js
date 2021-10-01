exports.run = async (client, message, args) => {
if(!args[0]) {
    var welcome = " ";
    welcome += " ** » -setwelcome embed**   "
    welcome += " \n** » -setwelcome embedstyle** ( 0, 1 , 2) \n ``-setwelcome embedstyle 0`` " 
    welcome += " \n** » -setwelcome on  **" 
    welcome += " \n** » -setwelcome image (IMG link,  x,y )** \n ``-setwelcome image https://img.png 450 480`` " 
    welcome += " \n** » -setwelcome usertimg ( x,y, size ) **\n ``-setwelcome userimg 180 175 18   `` " 
    welcome += " \n** » -setwelcome avatarimg ( x,y ) **\n ``-setwelcome avatarimg 180 175   `` " 
    welcome += " \n** » -setwelcome preview** " 
    welcome += " \n** » -setwelcome text** \n ``-setwelcome text Welcome [user] on [server] invited by [inviter]`` " 
    welcome += " \n** » -setwelcome chat** \n ``-setwelcome chat #welcome`` " 


    let embed = new discord.RichEmbed()

        .setColor( "GREEN" )
        .setAuthor('Join & Quit setup. ', message.guild.avatarURL)
        .setFooter(  message.member.displayName, message.author.displayAvatarURL)
        .addField(' » Welcome Setup  ', welcome )
        .setTimestamp()
 message.channel.send({embed})
}
var result = sql.query(`SELECT * FROM welcome WHERE guild = ${message.guild.id}`);
if(!result.length) {
    sql.query(`INSERT INTO welcome (guild) VALUES (${message.guild.id})`)
}
if(args[0] == "embed") {
if(result[0].embed == 0) {
    sql.query(`UPDATE welcome SET embed = 1 WHERE guild = ${message.guild.id}`);
    message.channel.send(':white_check_mark: ** Welcome embed is enabled.**')
} else {
    sql.query(`UPDATE welcome SET embed = 0 WHERE guild = ${message.guild.id}`);
    message.channel.send(':white_check_mark: ** Welcome embed is disabled.**')
}
}
if(args[0] == "embedstyle") {
if(args[1] == 0 ) {
    sql.query(`UPDATE welcome SET embedstyle = 0 WHERE guild = ${message.guild.id}`);
    message.channel.send(':white_check_mark: ** Embed style has changed to default style.**')
}
if(args[1] == 1 ) {
    sql.query(`UPDATE welcome SET embedstyle = 1 WHERE guild = ${message.guild.id}`);
    message.channel.send(':white_check_mark: ** Embed style has changed to advanced style.**')
}
}
if(args[0] == "on") {
    if(result[0].active == 0) {
        if(!result[0].chat) { 
            message.channel.send(':x: ** You need to set welcome chat before!** \n ``-setwelcome chat``')
        } else { 
        sql.query(`UPDATE welcome SET active = 1 WHERE guild = ${message.guild.id}`);
        message.channel.send(':white_check_mark: ** Welcome is enabled.**')
        }
    } else {
        sql.query(`UPDATE welcome SET active = 0 WHERE guild = ${message.guild.id}`);
        message.channel.send(':white_check_mark: ** Welcome is disabled now.**')
    }
}
if(args[0] == "text") {
    var msg = message.content.replace('-setwelcome text', '')
    if(!args[1]) return message.channel.send('Hah?!');
    sql.query(`UPDATE welcome SET text = "${msg}" WHERE guild = ${message.guild.id}`)
    message.channel.send('**:writing_hand:  Welcome text has changed to ' + msg + '** ');
}
if(args[0] == "chat") {
    var chat = message.mentions.channels.first()
     if(chat) {
        sql.query(`UPDATE welcome SET chat = ${chat.id} WHERE guild = ${message.guild.id}`)
        message.channel.send('**Congratulations new chat **' + chat)
    } else {
       message.channel.send('Hah?!')
    }
}
if(args[0] == "preview") {
    var chat = message.channel.id;
    if(result[0].chat) {
        chat = result[0].chat
    }
    if(result[0].embed == 1) {

		let embed = new discord.RichEmbed()
			.setThumbnail(message.member.user.displayAvatarURL)
			.setColor(0x36393f)
			.setAuthor(message.member.displayName,message.member.user.displayAvatarURL)
			
			.addField('» مضى على دخولك الديسكورد',getDays(message.member.user.createdTimestamp,Date.now()) + " يوماً",true)
			.addField('» مضى على دخولك للسيرفر',getDays(message.member.joinedTimestamp,Date.now()) + " يوماً",true)
            .addField('» رقمك في الدخول اليومي','0',true)
            .addField('» تم دعوتك بواسطة',message.member,true)
        message.guild.channels.get(chat).send({embed})

    } else {
        if(!result[0].text) return message.channel.send('Hah?! **text before!**');
        message.guild.channels.get(chat).send(result[0].text.replace('[user]', message.member).replace('[inviter]', message.member))
    }
}
}
       
       
       
    exports.settings = {
           "name": "setwelcome",
           "sub-names": [ ],
           "server": true,
           "premium": false,
           "owneronly": false,
           "permissions": [ "MANAGE_GUILD" ],
           "perMsg": "",
           "description": "لـ انشاء ترحيب . ",
           "group": 2
    }  