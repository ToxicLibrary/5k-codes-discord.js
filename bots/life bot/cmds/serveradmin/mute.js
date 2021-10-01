exports.run = async (client, message, args) => {
        let mm = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!mm) return message.channel.send("**رجاء حدد شخص بالمنشن **");
        if(mm.id === message.author.id) return message.channel.send("**لايمكنك اعطاء نفسك ميوت**");
        if(mm.highestRole.position >= message.member.highestRole.position) return message.channel.send("لايمكنك اعطائه ميوت لانه اعلى منك او نفسك!");
        let role = message.guild.roles.find(r => r.name === "Mute");
		if(!role) {
			try {
				role = await message.guild.createRole({
					name: "Mute",
					color: "#FF1111",
					permissions: []
				});
				message.guild.channels.forEach(async (channel, id) => {
					await channel.overwritePermissions(role, {
						SEND_MESSAGES: false,
					});
				});
			} catch(e) {
				return;
			}
		}
        if(mm.roles.has(role.id)) return message.channel.send(":white_check_mark: : **معه ميوت من قبل ! ** ");
         mm.addRole(role);
         var end_time = new Date(); 
            if(message.content.endsWith('h')) {
                end_time.setHours(end_time.getHours() + parseInt(args[1]))
    
        }
        if(message.content.endsWith('m')) {
            end_time.setMinutes(end_time.getMinutes() + parseInt(args[1]))


        }
        if(message.content.endsWith('s')) {

            end_time.setSeconds(end_time.getSeconds() + parseInt(args[1]))

  
        }
        if(message.content.endsWith('d')) {

            end_time.setDate(end_time.getDate() + parseInt(args[1]))

        }
        if(message.content.endsWith('y')) {

            end_time.setFullYear(end_time.getFullYear() + parseInt(args[1]))

        }
    

         message.channel.send(":white_check_mark: :  ** Mute successfully added**");

            var today = moment().format('YYYY');
            var month = moment().format('MM');
            var day = moment().format('DD');
if(args[1]) {
if(args[2]) { 
ssql.query(`INSERT INTO usersmute (user, username, server, admin, adminname, time, channel, channel_name, server_name, type, muted) VALUES  (?,?,?,?,?, ?, ?, ?,?, ?, ?)`, [mm.id, mm.displayName, message.guild.id, message.author.id, message.member.displayName, end_time, message.channel.id, message.channel.name, message.guild.name, "Voice", 0], function (error, results, fields) {
    if (error) throw error;
})
    } else {
        ssql.query(`INSERT INTO usersmute (user, username, server, admin, adminname, time, channel, channel_name, server_name, type, muted) VALUES (?,?,?,?,?,?,?, ?, ?, ?, ?)`, [mm.id, mm.displayName, message.guild.id, message.author.id, message.member.displayName, end_time, message.channel.id, message.channel.name, message.guild.name, "Text", 1], function (error, results, fields) {
            if (error) throw error;
        })
        }
    
} else {
  //  sql.query(`INSERT INTO usersmute (user, server, admin, adminname, channel, channel_name, server_name) VALUES (${mm.id} , ${message.guild.id}, ${message.author.id}, '${message.member.displayName}',  ${message.channel.id}, '${message.channel.name}', '${message.guild.name}')`)
    ssql.query(`INSERT INTO usersmute (user, username, server, admin, adminname, channel, channel_name, server_name, type, muted) VALUES (?,?, ?,?,?,?, ?, ?,?,?)`, [mm.id, mm.displayName, message.guild.id, message.author.id, message.member.displayName, message.channel.id, message.channel.name, message.guild.name, "Text", 0], function (error, results, fields) {
        if (error) throw error;
    })
}

}
    
    
    
    exports.settings = {
        "name": "mute",
        "sub-names": ["ميوت"],
        "server": true,
        "owneronly": false,
        "premium": false,

        "permissions": [ "MANAGE_MESSAGES" ],
        "perMsg": "",
        "description": "لـ كتم شخص ",
        "group": 1
    }  