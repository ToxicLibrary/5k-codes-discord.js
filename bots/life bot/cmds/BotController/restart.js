exports.run = async (client, message, args) => {
   await message.channel.send("**:timer: Restarting ...**");
    process.exit(1);
    }
        
        
        
        exports.settings = {
            "name": "restart",
            "sub-names": [ "reboot" ],
            "server": false,
            "owneronly": true,
            "premium": false,
            "permissions": [  ],
            "perMsg": "",
            "description": "لـ عمل اعادة تشغيل للبوت",
            "group": 3
        }  