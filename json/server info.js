  const count = require("./count.json")
const finished = require("./finished.json")
client.on('ready', () => {
    bot.setInterval(() => {
        let ga;
        Object.keys(finished).forEach((key) => {
            ga = key
        });
        if (finished[ga] !== undefined) {
            if (Date.now() > finished[ga].timefinish) {
                finished[ga + ' Finished'] = {
                    Joins: finished[ga].Joins,
                    Leaves: finished[ga].Leaves
                }
                finished[ga].Joins = 0
                finished[ga].Leaves = 0
                finished[ga].timefinish = Date.now() + 6.048e+8
                fs.writeFile('./finished.json', JSON.stringify(finished, null, 4), (err) => { if (err) throw err; })
            }
        }
    }, 5000)
 
})
client.on('guildMemberAdd', (codes) => {
    if (count[codes.guild.id] == undefined) {
        count[codes.guild.id] = {
            Joins: 1,
            Leaves: 0,
            timefinish: Date.now() + 6.048e+8
        }
    } else {
        count[codes.guild.id].Joins += 1
    }
    if (finished[codes.guild.id] == undefined) {
        finished[codes.guild.id] = {
            Joins: 1,
            Leaves: 0,
            timefinish: Date.now() + 6.048e+8
        }
    } else {
        finished[codes.guild.id].Joins += 1
    }
    fs.writeFile('./count.json', JSON.stringify(count, null, 4), (err) => {
        if (err) throw err;
    })
    fs.writeFile('./finished.json', JSON.stringify(finished, null, 4), (err) => {
        if (err) throw err;
    })
})
client.on('guildMemberRemove', (codes) => {
    if (count[codes.guild.id] == undefined) {
        count[codes.guild.id] = {
            Joins: 0,
            Leaves: 1,
            timefinish: Date.now() + 6.048e+8
        }
    } else {
        count[codes.guild.id].Leaves += 1
    }
    if (finished[codes.guild.id] == undefined) {
        finished[codes.guild.id] = {
            Joins: 0,
            Leaves: 1,
            timefinish: Date.now() + 6.048e+8
        }
    } else {
        finished[codes.guild.id].Leaves += 1
    }
    fs.writeFile('./count.json', JSON.stringify(count, null, 4), (err) => {
        if (err) throw err;
    })
    fs.writeFile('./finished.json', JSON.stringify(finished, null, 4), (err) => {
        if (err) throw err;
    })
})
client.on('message', function (message) {
    const messageArray = message.content.split(' ')
    const command = messageArray[0].toLowerCase()
    const args = messageArray.slice(1)
    if (command == `${prefix}server`) {
        var embed = new RichEmbed()
        let guild;
        if (count[message.guild.id] == undefined) {
            return;
        }
        if (count[message.guild.id] !== undefined) {
            let tjlr = (count[message.guild.id].Joins / count[message.guild.id].Leaves).toFixed(2)
                        if (tjlr == Infinity) tjlr = '0.00'
                        embed.addField(`? Server ID:`, `? **${message.guild.id}**`, true)
                        embed.addField(`? Created on:`, `? **${moment(message.guild.createdAt).format(`D/M/YYYY h:mm`)} \n ${moment(message.guild.createdAt).locale("AR-eg").fromNow()}**`,true)
                        embed.addField(`? Owned by:`, `? **${message.guild.owner.user.tag} [${message.guild.owner.user.id}]**`,true)
                        embed.addField(`? Members **${message.guild.members.size}**`, `? **${message.guild.members.filter(c => c.presence.status !== "offline").size}** Online`, true)
                        embed.addField(`? Channels **${message.guild.channels.size}**`,`? **${message.guild.channels.filter(f => f.type === "text").size}** Text | **${message.guild.channels.filter(f => f.type === "voice").size}** Voice`,true)
                        embed.addField(`? Others:`, `? Region: **${message.guild.region}** \n? Verification level: **${message.guild.verificationLevel}**`, true)  
                        embed.addField(`? Roles **${message.guild.roles.size}**`, `? More?: **${prefix}roles**`, true)
                        embed.setThumbnail(`${message.guild.iconURL}`)
                        embed.setColor(`black`)
                        embed.setAuthor(`${message.guild.name}`, `${message.guild.iconURL}`)
            embed.addField('? Total joins - Leaves:', `? **${count[message.guild.id].Joins}** | **-${count[message.guild.id].Leaves}**`)
            embed.addField('? Week stats:', `? Joins: **${finished[message.guild.id].Joins}** | ? Leaves: **-${finished[message.guild.id].Leaves}**`)
        }
        if(finished[message.guild.id] == undefined) return;
        if (guild == message.guild.id) {
            let something = (finished[message.guild.id].Joins / finished[message.guild.id].Leaves).toFixed(2)
            if(isNaN(something)) something = 0.00
        }
        finished[message.guild.id + ' Finished'] == undefined;
        message.channel.send(embed)
    }
})