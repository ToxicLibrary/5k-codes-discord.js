const logs = { 
    "1": { 
        "real": " اضافة باند",
        "website": "addban"
    },
    "2":{ 
        "real": " ازالة الباند",
        "website": "removeban"
    },
    "3": { 
        "real": " طرد عضو",
        "website": "kickuser"
    },
    "4":{ 
        "real": " دخول عضو",
        "website": "joinuser"
    },
    "5":{ 
        "real": " خروج عضو",
        "website": "leaveuser"
    },
    "6":{ 
        "real": " تعديل رسالة",
        "website": "editmsg"
    },
    "7":{ 
        "real": " حذف رسالة",
        "website": "deletemsg"
    },
    "8":{ 
        "real": " انشاء رول",
        "website": "newrole"
    },
    "9": { 
        "real": "تحديث رول",
        "website": "updaterole"
    },
    "10": { 
        "real": "ازالة رول ",
        "website": "removerole"
    },
    "11": { 
        "real": "انشاء روم ",
        "website": "newchannel"
    },
    "12": { 
        "real": "تحديث روم ",
        "website": "updatechannel"
    },
    "13": { 
        "real": "ازالة روم ",
        "website": "removechannel"
    },
    "14": { 
        "real": "المايك والسماعة - Mute defean ",
        "website": "mutedefean"
    },
    "15": { 
        "real": "الطرد الصوتي ",
        "website": "vkick"
    },
    "16": { 
        "real": "السحب من الرومات الصوتية -move ",
        "website": "move"
    },
    "17": { 
        "real": "الدخول للفويس والخروج منه ",
        "website": "voiceonoff"
    },
    "18": {
        "real": " اعطاء عضو رول ",
        "website": "addroleuser"
    },
    "19": {
        "real": " سحب رول من عضو ",
        "website": "removeroleuser"
    },
    "20": {
        "real": "تعديل السيرفر  ",
        "website": "editserver"
    },
    }
    
    function getResult( key, guild ) {
    var result = sql.query(`SELECT * FROM logschat WHERE guildid =  ${guild.id} `)
    if(!result.length) {
        sql.query(`INSERT INTO logschat (guildid) VALUES (${guild.id})`)
    return false;
    } else { 
        if(result[0][logs[key].website] == 1) {
        return true;
    }
    if(result[0][logs[key].website] == 0) {
        return false;
    }
    }
    }
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    exports.run = async (client, message, args) => { 
        if(!message.member.hasPermission("ADMINISTRATOR")) return;
        // if empty >> 
        var text = " ";
        let embed = new discord.RichEmbed()
        .setColor("000000")
        for (let i = 1; i - 1 < Object.size(logs); i++) { 
            text += `**\n »  ${logs[i].real} رقم الوق (  ${i}  ) **`;
        }
        embed.setDescription(text)
        embed.setAuthor(  message.member.displayName, message.member.user.displayAvatarURL)
        
        embed.setThumbnail(message.member.user.displayAvatarURL)
        .setFooter('لايوجد صفحات اخرى 1 من 1' )
        if(!args[0]) return message.reply( { embed } );
        // >> end 
        
        
        // > choose 
        if(logs[args[0]]) {
            if( message.mentions.channels.first( )) { 
                var c = message.mentions.channels.first( )
                if(!c) return;
        message.reply('** [ :white_check_mark:  ] تم اختيار ' + logs[args[0]].real + '**')
        getResult(args[0], message.guild)
        sql.query(`UPDATE logschat SET ${logs[args[0]].website} = ${c.id} WHERE guildid = ${message.guild.id}`)
    console.log(sql.query(`SELECT ${logs[args[0]].website} FROM logschat WHERE guildid = ${message.guild.id}`))
    }
    
        } else {
           
            message.reply(' **[ × ] الرقم غير صحيح :1234: ** ');
            
        }
        // >> end
        };
        
        exports.settings = {
            "name": "logschat",
            "sub-names": [],
            "premium": false,
            "server": false,
            "owneronly": true,
            "permissions": [  ],
            "perMsg": "",
            "description": "لـ تفعيل الوق",
            "group": 3
        }  