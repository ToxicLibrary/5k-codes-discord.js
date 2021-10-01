var { exec } = require('child_process');
premium_servers = [ ];

module.exports = async (client) => {
    
    loadMySQL = async ( ) => {
        sql = new mysql({
            host     : database_config.mysql.host,
            user     : database_config.mysql.user,
            password : database_config.mysql.password,
            database : database_config.mysql.database
          });
          ssql = mysql2.createConnection({
            host     : database_config.mysql.host,
            user     : database_config.mysql.user,
            password : database_config.mysql.password,
            database : database_config.mysql.database
          });
        ssql.connect();
setTimeout(function ( ) { 
if(client.user.id == "563817330791022648") { 
        ssql.query(`SELECT * FROM premium`, function (error, results, fields) {

    for (let i = 0; i < results.length; i++) {
        if(results[i].enddate > new Date()) {
premium_servers.push(results[i].guild)
    }
}
        })  

         prmeiumLoad();
}
}, 8000)
    }
    prmeiumLoad = async () => {
        var result = sql.query(`SELECT * FROM premium `);
        if(!result.length) return;
console.log('1')
        var i;
        for (i = 0; i < result.length; i++) { 
exec(`pm2 start premium.js --name ${result[i].id} -- ${result[i].token}`)

        }
     }
    load = async ( ) => {
        events = {
            "BanMember": "guildMemberBan",
            "RemoveBan": "guildBanRemove",
            "run": "ready",
            "error": "error",
            "onmsg": "message",
            "Join": "guildMemberAdd",
            "VoiceUpdate": "voiceStateUpdate",
            "deletemsg": "messageDelete",
            "updatemsg": "messageUpdate", 
            "newrole": "roleCreate",
            "deleterole": "roleDelete",
            "updaterole": "roleUpdate",
            "newchannel": "channelCreate",
            "deletechannel": "channelDelete",
            "updatechannel": "channelUpdate",
            "newguild": "guildCreate",
            "deleteguild": "guildDelete",
            "RemoveMember": "guildMemberRemove",
            "UpdateMember": "guildMemberUpdate",
            "updateGuild": "guildUpdate",
        }
        fs.readdir("./events/", (err, files) => {
            files.forEach(file => {
                fs.readdir(`./events/${file}`, (err,files2) => {
    files2.forEach(f=> {
                    let eventFunction = require(`./events/${file}/${f}`);
                    client.on(events[file], (...args) => eventFunction.run(client, ...args));
    })
                })
              })
        })

        // commands
        commands = { };
        help = { };
        fs.readdir("./cmds/", (err, files) => {
            files.forEach(file => {
                fs.readdir(`./cmds/${file}`, (err,files2) => {
    
    files2.forEach(f=> {
        let cmd = require(`./cmds/${file}/${f}`);
    cmd.settings["sub-names"].forEach(s => {
        commands[s] = {
            group: file,
            folder: f,
        };
    })
    commands[cmd.settings.name] = {
        group: file,
        folder: f,
    };
    help[cmd.settings.name] ={ 
        des: cmd.settings.description, 
        group: cmd.settings.group,
        settings: cmd.settings
    }
    })
    
                })
              })
        })
    
    }
    refreshHelp = async() => {
        help = { };
        fs.readdir("./cmds/", (err, files) => {
            files.forEach(file => {
                fs.readdir(`./cmds/${file}`, (err,files2) => {
    
    files2.forEach(f=> {
        let cmd = require(`./cmds/${file}/${f}`);
    help[cmd.settings.name] ={ 
        des: cmd.settings.description, 
        group: cmd.settings.group,
        settings: cmd.settings
    }
})
                })
            })
        })
     }
    reload = async(name, type) => {
        if(type == "event") {
            events = {
                "BanMember": "guildMemberBan",
                "RemoveBan": "guildBanRemove",
                "run": "ready",
                "error": "error",
                "onmsg": "message",
                "Join": "guildMemberAdd",
                "VoiceUpdate": "voiceStateUpdate",
                "deletemsg": "messageDelete",
                "updatemsg": "messageUpdate", 
                "newrole": "roleCreate",
                "deleterole": "roleDelete",
                "updaterole": "roleUpdate",
                "newchannel": "channelCreate",
                "deletechannel": "channelDelete",
                "updatechannel": "channelUpdate",
                "newguild": "guildCreate",
                "deleteguild": "guildDelete",
                "RemoveMember": "guildMemberRemove",
                "UpdateMember": "guildMemberUpdate",
                "updateGuild": "guildUpdate",
            }
            
            fs.readdir("./events/", (err, files) => {
                files.forEach(file => {
                    fs.readdir(`./events/${file}`, (err,files2) => {
        files2.forEach(f=> {
            delete require.cache[require.resolve(`./events/${file}/${f}`)]

                        let eventFunction = require(`./events/${file}/${f}`);
                        client.on(events[file], (...args) => eventFunction.run(client, ...args));
        })
                    })
                  })
            })

        }
        
        delete require.cache[require.resolve(`./cmds/${commands[name].group}/${commands[name].folder}`)]
    }
}


