exports.run = async (client, message, args) => {
    let mm = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!mm) return message.channel.send("**رجاء حدد شخص بالمنشن **");
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
                    SEND_MESSAGES: false,
                });
            });
        } catch(e) {
            return;
        }
    }
    if(mm.roles.has(role.id)) {
mm.removeRole(role);
    message.channel.send(':white_check_mark: ** Mute successfully removed** ')
    
}
     

}



exports.settings = {
    "name": "unmutev",
    "sub-names": [],
    "server": true,
    "owneronly": false,
    "premium": false,
    "permissions": [ "MANAGE_MESSAGES" ],
    "perMsg": "",
    "description": "لـ فك الكتم الصوتي من شخص ",
    "group": 1
}  