/*
����� ����� ��� ��� ���� ����
���� ���� � ����� ���� ��� ��� ���� �����
������� ������� ��� ��� ����� ���� ����� ��� ���� ������ ��� ���� ����� �� ����� ���� ���� �� 30 ��� ����� ��� � ����� ���� ����
���� �� ����� ��� ���� ������ ������
����� ��� 
$unmute
���� ���� ����� �� � ���� ��� ���� � ����� ���� ��������
���� �� ������ ���� ��� ��
$setup
���� ����� ��� � ���� ���� ���� ������ ������ ������ ����� ��� �� ������� ����� ������ � ���� ���� ����
��� � ���� ������� ���� ������� ����� ���� �������� 
$setup
���� ������ �������
��� �� �� ����� �� ���� ��� ��� �����
mutes.json 
��� ����� {}
����� ��� �������
npm i ms
npm i fs
npm i discord.js
*/
const Discord = require("discord.js")
const client = new Discord.Client()
const ms = require("ms")
const bot = client
const fs = require("fs")
bot.mutes = require("./mutes.json")
client.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}`)
    bot.setInterval(() => {
        for (let i in bot.mutes) {
            let time = bot.mutes[i].time;
            let member = bot.mutes[i].muted
            let mutereason = "Mute time is over"
            if (Date.now() > time) {
                bot.guilds.get(bot.mutes[i].guildid).members.get(`${member}`).removeRole(bot.mutes[i].roleid, mutereason)
                delete bot.mutes[i];
                fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), (err) => {
                    if (err) throw err;
                    console.log(`${bot.users.get(member).username} has been unmuted`)
                })
            }
        }
    }, 5000)
})
bot.on("guildMemberAdd", async (member) => {
    for (let i in bot.mutes) {
        let data = bot.mutes[i];
        if (data === undefined) return;
        if (data.guildid !== member.guild.id) return;
        let mutereason = "��� ���� � ���� ����� � �� �����"
        let guildID = bot.mutes[i].guildid;
        if (member.id === bot.mutes[i].muted) {
            bot.guilds.get(`${guildID}`).members.get(`${member.id}`).addRole(`${bot.mutes[i].roleid}`, mutereason)
        } else {
            return;
        }
    }
})
client.on('message', async message => {
    let prefix = "$"
    let messageArray = message.content.split(' ')
    let args = messageArray.slice(1)
    let cmd = messageArray[0]
    if (cmd === `${prefix}mute`) {
        message.delete();
        // ��� ����� ��� ������� ��� ������ ������ ��������
        if (!message.member.roles.some(r => ['����� ��� 2 ��� ����� ������ ��������', '����� ��� ����� ������ ��������'].includes(r.name))) return message.reply('You do not have permissions').then(msg => msg.delete(30000))
        let themuteguy = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!themuteguy) return message.channel.send("**������ ��� ������**").then(msg => msg.delete(8000))
        if (themuteguy.id == message.author.id) return message.reply('You cannot mute yourself can you ??? ')
        let roleid = message.guild.roles.find(c => c.name === "Muted")
        if (!roleid) return message.reply(`Please use \`${prefix}setup\` first`)
        let mutereason = args.join(" ").slice(25)
        if (!mutereason) return message.reply(`\`Usage: ${prefix}mute mention time reason\``)
        let time = args[1]
        if (ms(time) > 2.592e+9) return message.reply('Must be lower or equal to 30 days') // ��� �� ����� ���� �� 30 ��� ����� � ����� ������ ���� ���� ������� ����� ���� ��� ������� �� ��� ���� ���� �����
        if (themuteguy.roles.has(roleid.id)) return message.channel.send("This guy already is muted")
        bot.mutes.count++ + 1
        if (isNaN(bot.mutes.count)) bot.mutes.count = 0 + 1;
        bot.mutes[bot.mutes.count] = {
            time: Date.now() + ms(time),
            muted: themuteguy.id,
            roleid: roleid.id,
            guildid: message.guild.id
        }
        await message.guild.member(themuteguy.id).addRole(roleid.id, mutereason)
        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
            if (err) throw err;
            message.reply(`Done <@!${themuteguy.id}> Has been muted!`).then(msg => msg.delete(20000))
            let muteembed = new Discord.RichEmbed()//�����
                .setAuthor("Mute log!")
                .setColor("#FFFFFF")
                .setTimestamp()
                .addField("For:", `${themuteguy} \`(${themuteguy.id})\``)
                .addField("By:", `${message.author} \`(${message.author.id})\``)
                .addField("Reason:", mutereason)
                .addField("Time", `${ms(ms(time), { long: true })}`)
            let mutechannel = bot.channels.find(c => c.name === "logs")
            if (!mutechannel) return;
            mutechannel.send(muteembed)
        })
    }
    if (cmd == `${prefix}unmute`) {
        if (!message.member.roles.some(r => ['����� ��� 2 ��� ����� ������ ��������', '����� ��� ����� ������ ��������'].includes(r.name))) return message.reply('You do not have permissions').then(msg => msg.delete(30000))
        let tounmute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!tounmute) return message.reply('**Mention someone to unmute!**')
        let muterole = message.guild.roles.find(c => c.name == 'Muted')
        if (!muterole) {
            aaa = await message.guild.createRole({
                name: "Muted",
                permissions: []
            });
        }
        if(!tounmute.roles.has(muterole.id)) return message.reply('Uhhh he\'s not muted!')
        for(var i in bot.mutes) {
            let data = bot.mutes[i];
            if(data.muted == tounmute.id && data.guild == message.guild.id){
            message.guild.members.get(`${tounmute.id}`).removeRole(message.guild.roles.find(c => c.name == 'Muted'), "Unmute command")
            delete bot.mutes[i];
            }
        }
        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
            message.channel.send('Done')
            if (err) throw err;
        })
    }
    if (cmd == `${prefix}setup`) { // �������� ��� �� ��� ���� ������� ���� ����� ��� ������ ����� �� ����� ���� ��� ������ ���� �������� �� 
        if (!message.member.roles.some(r => ['����� ��� 2 ��� ����� ������ ��������', '����� ��� ����� ������ ��������'].includes(r.name))) return message.reply('You do not have permissions').then(msg => msg.delete(30000))
        let role = message.guild.roles.find(c => c.name === "Muted")
        if (!role) {
            muterole = await message.guild.createRole({
                name: "Muted",
                permissions: []
            });
        }
        message.guild.channels.forEach(async (channel) => {
            await channel.overwritePermissions(role.id, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
        message.channel.send('Done')
    }
})
client.login('Token here')