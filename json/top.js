var top = require("./top.json");
function save() {
    fs.writeFileSync("./top.json", JSON.stringify(top, null, 4));
}
client.on("voiceStateUpdate", async function(oldMember, newMember) {
    if (newMember.user.bot) return;
    if (!top[newMember.guild.id]) top[newMember.guild.id] = {};
    if (!top[newMember.guild.id][newMember.user.id]) top[newMember.guild.id][newMember.user.id] = {
        "text": 0,
        "voice": parseInt(Math.random()*10),
        "msgs": 0,
        "id": newMember.user.id
    }
    save();
    if (!oldMember.voiceChannel && newMember.voiceChannel) {
        var addXP = setInterval(async function () {
            top[newMember.guild.id][newMember.user.id].voice+=parseInt(Math.random()*4);
            save();
            if (!newMember.voiceChannel) {
                clearInterval(addXP);
            }
        }, 60000);
    }
});
client.on("message", async function (message) {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!top[message.guild.id]) top[message.guild.id] = {};
    if (!top[message.guild.id][message.author.id]) top[message.guild.id][message.author.id] = {
        "text": parseInt(Math.random()*10),
        "voice": 0,
        "msgs": 0,
        "id": message.author.id
    }
    if (top[message.guild.id][message.author.id].msgs > 10) {
        top[message.guild.id][message.author.id].text += parseInt(Math.random()*4);
        top[message.guild.id][message.author.id].msgs = 0;
    }
    save();
    var args = message.content.split(" ");
    var cmd = args[0].slice(prefix.length).toLowerCase();
    if (!message.content.startsWith(prefix)) return;
    switch (cmd) {
        case ".top":
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 10).filter(user => user.text > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.text > 0) {
                    return `**\`#${++num}\` | <@${user.id}> XP: \`(${user.text})\` **`
                }
            }).join("\n")}`;
            num = 0;
            var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 10).filter(user => user.voice > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.voice > 0) {
                    return `**\`#${++num}\` | <@${user.id}> XP: \`(${user.voice})\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .addField(`» TOP 10 TEXT`, textStr.length > 1 ? textStr : "» NO TOP TEXT", true)
            .addField(`» TOP 10 VOICE`, voiceStr.length > 1 ? voiceStr : "» NO TOP VOICE", true)
            .setFooter(client.user.tag, client.user.displayAvatarURL)
            .setColor("BLUE");
            message.channel.send({
                embed: embed
            });
        break;
        case ".topvoice":
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var voiceStr = `${topArray.sort((a, b) => b.voice - a.voice).slice(0, 5).filter(user => user.voice > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.voice > 0) {
                    return `**\`#${++num}\` | <@${user.id}> XP: \`(${user.voice})\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.RichEmbed()
            .setTitle("» TOP 5 VOICE")
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(voiceStr.length > 1 ? voiceStr : "» NO TOP VOICE")
            .setFooter(client.user.tag, client.user.displayAvatarURL)
            .setColor("BLUE");
            message.channel.send({
                embed: embed
            });
        break;
        case ".toptext":
            var topArray = Object.values(top[message.guild.id]);
            var num = 0;
            var textStr = `${topArray.sort((a, b) => b.text - a.text).slice(0, 5).filter(user => user.text > 0 && message.guild.members.get(user.id)).map(function (user) {
                if (user.text > 0) {
                    return `**\`#${++num}\` | <@${user.id}> XP: \`(${user.text})\` **`
                }
            }).join("\n")}`;
            var embed = new Discord.RichEmbed()
            .setTitle("» TOP 5 TEXT")
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(textStr.length > 1 ? textStr : "» NO TOP TEXT")
            .setFooter(client.user.tag, client.user.displayAvatarURL)
            .setColor("BLUE");
            message.channel.send({
                embed: embed
            });
        break;
    }
});
