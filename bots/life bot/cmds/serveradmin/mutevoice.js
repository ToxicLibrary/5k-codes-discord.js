exports.run = async (client, message, args) => {
        let mm = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!mm) return message.channel.send("**رجاء حدد شخص بالمنشن **");
        if(mm.id === message.author.id) return message.channel.send(`**:no_entry:  You can't mute ${mm}.**`);
        if(mm.highestRole.position >= message.member.highestRole.position) return message.channel.send(`**:no_entry:  You can't mute ${mm}.**`);
        let role = message.guild.roles.find(r => r.name === "MuteV");
		if(!role) {
			try {
				role = await message.guild.createRole({
					name: "MuteV",
					color: "#FF1111",
					permissions: []
				});
				message.guild.channels.forEach(async (channel, id) => {
					await channel.overwritePermissions(role, {
                        CONNECT: false,
                        SPEAK: false,

					});
				});
			} catch(e) {
				return;
			}
		}
        if(mm.roles.has(role.id)) return;
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
        ssql.query(`INSERT INTO usersmute (user, username, server, admin, adminname, time, channel, channel_name, server_name, type, muted) VALUES (?,?,?,?,?,?, ?, ?, ?, ?, ?)`, [mm.id, mm.displayName, message.guild.id, message.author.id, message.member.displayName, end_time, message.channel.id, message.channel.name, message.guild.name, "Voice", 0], function (error, results, fields) {
            if (error) throw error;
        })
        }
    
} else {
    ssql.query(`INSERT INTO usersmute (user, username, server, admin, adminname, channel, channel_name, server_name, type, muted) VALUES (?,?, ?,?,?,?, ?, ?,?, ?)`, [mm.id, mm.displayName, message.guild.id, message.author.id, message.member.displayName, message.channel.id, message.channel.name, message.guild.name, "Voice", 0], function (error, results, fields) {
        if (error) throw error;
    })
}

}
    
    
    
    exports.settings = {
        "name": "mutev",
        "sub-names": ["سجن", "ميوت-صوتي", "ميوت-صوت", "vmute"],
        "server": true,
        "owneronly": false,
        "premium": false,
        "permissions": [ "MANAGE_MESSAGES" ],
        "perMsg": "",
        "description": "لـ كتم شخص بالفويس",
        "group": 1
    }  