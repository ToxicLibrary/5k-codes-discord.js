
    

exports.run = async (client, message, args, cmd) => {
    awaitMSG('1', message.author.id, message.guild.id, cmd)
    message.channel.send('- قؤائم المساعدة | \n [1] ادارة السيرفرات \n [2] الاوامر العامة \n [3] اوامر خاصة \n  [4] اوامر الدعم \n اوامر البروفايل [5] ').then(m => {
        m.react('')
    })
/*
    var c = { 
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
        '6': [],

    
    }
    Object.keys(help).forEach(key => {
    if(help[key].group == 1) {
        c['1'].push(key);
    }
    if(help[key].group == 2) {
        c['2'].push(key);
    }
    if(help[key].group == 3) {
        c['3'].push(key);
    }
    if(help[key].group == 4) {
        c['4'].push(key);
    }
    if(help[key].group == 5) {
        c['5'].push(key);
    }
    if(help[key].group == 6) {
        c['6'].push(key);
    }
    })
    var msg2 = "**"
    var msg = "**"
    msg += "بأمكانك دعوة البوت والتحكم باعداداته عن طريق موقعنا : \n"
    msg += "قريبا/ \n"
    msg += " - الاداره السيرفرات \n"
    msg += "  \n"
    awaitReaction(message.author.id, message.guild.id, message.id)
    c['1'].forEach(key => { 
    if(help[key].settings.owneronly) { 
        if(main_config.bot.owners.includes(message.author.id)) { 
            msg += `    [  :white_small_square: ] ${main_config.bot.prefix}${key} |  ${help[key].des} \n`
        }
    } else {
        if(help[key].settings.premium) { 
            if(client.user.id !== main_config.bot.botid) { 
                msg += `    [  :white_small_square: ] ${main_config.bot.prefix}${key} |  ${help[key].des} \n`
            }
        } else {
            msg += `    [  :white_small_square: ] ${main_config.bot.prefix}${key} |  ${help[key].des} \n`
        }
    }
    })
    msg += "  \n"
    msg += "- الاوامر العامة \n"
    c['2'].forEach(key => { 
        if(help[key].settings.owneronly) { 
            if(main_config.bot.owners.includes(message.author.id)) { 
                msg += `    [  :small_blue_diamond: ] ${main_config.bot.prefix}${key} |  ${help[key].des} \n`
            }
        } else {
            if(help[key].settings.premium) { 
                if(client.user.id !== main_config.bot.botid) { 
                    msg += `    [  :small_blue_diamond: ] ${main_config.bot.prefix}${key} |  ${help[key].des} \n`
                }
            } else {
                msg += `    [  :small_blue_diamond: ] ${main_config.bot.prefix}${key} |  ${help[key].des} \n`
            }
        }
        })
        msg += " \n"
    if(c['3'].length) { 
    msg += "- اوامر خاصة \n"
    c['3'].forEach(key => { 
        if(help[key].settings.owneronly) { 
            if(main_config.bot.owners.includes(message.author.id)) { 
                msg += `    [  :small_orange_diamond: ] ${main_config.bot.prefix}${key} |  ${help[key].des} \n`
            }
        } else {
            if(help[key].settings.premium) { 
                if(client.user.id !== main_config.bot.botid) { 
                    msg += `    [  :small_orange_diamond: ] ${main_config.bot.prefix}${key} |  ${help[key].des} \n`
                }
            } else {
                msg += `    [  :small_orange_diamond: ] ${main_config.bot.prefix}${key} |  ${help[key].des} \n`
            }
        }
        })
        msg += "**"

    msg2 += "  \n"
    msg2 += "- اوامر الدعم \n"
    c['4'].forEach(key => { 
                msg2 += `    [  :black_small_square:  ] ${main_config.bot.prefix}${key} |  ${help[key].des} \n`
     
        })
        msg2 += "  \n"
    msg2 += "- اوامر البروفايل \n"
    c['5'].forEach(key => { 
                msg2 += `    [ :white_medium_small_square:   ] ${main_config.bot.prefix}${key} |  ${help[key].des} \n`
     
        })
    
        msg2 += "**"
    }
    message.author.send(msg)
    .then( m => {
    message.author.send(msg2)

    })
    .catch(err =>  message.react('❌'))
    */
    }
        
              
              
              
              exports.settings = {
                  "name": "help",
                  "sub-names": [],
                  "server": false,
                  "owneronly": false,
                  "premium": false,
                  "permissions": [  ],
                  "perMsg": "",
                  "description": "لـ ارسال اوامر البوت",
                  "group": 4
              }  