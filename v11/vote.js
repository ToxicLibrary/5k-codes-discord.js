const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});
client.on('message', message => {
    const prefix = "$";
    const args = message.content.trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command == `${prefix}done`) {
        let mentioned = message.mentions.users.first();
        if (!mentioned) return message.reply("اين المنشن ي غلام")
        const array = ["1", "2", "3", "4", "5"]
        const embed = new Discord.RichEmbed()
            .addField('الرجاء التصويت حسب جودة الخدمة المقدمة اليك', `1 - راضي جداً\n2-راضي\n3- لا بأس\n4- غير راضي\n5- سيء جداً\n\nالرجاء الأختيار من الرقم 1 الى 5\nوبدون اضافة اي كلام اخر\n اضافة اي كلام غير ال ارقام سوف يلغي التصويت`)
        mentioned.send(embed);
        const filter = m => m.author.id === mentioned.id && array.some(answer => answer.toLowerCase() == m.content.toLowerCase());
        client.users.get(mentioned.id).createDM().then(channel => {
            channel.awaitMessages(filter, {
                maxMatches: 1,
                errors: ['time'],
                time: 60000
            }).then(collected => {
                const answer = collected.first().content;
                var hi;
                switch (answer) {
                    case "1":
                        hi = "راضي جداً"
                        break;
                    case "2":
                        hi = "راضي"
                        break;
                    case "3":
                        hi = "لا بأس"
                        break;
                    case "4":
                        hi = "غير راضي"
                        break;
                    case "5":
                        hi = "سيء جداً"
                        break;
                }
                channel.send("شكراً لتصويتك")
                var voted = new Discord.RichEmbed()
                voted.addField('Vote', hi)
                voted.addField('Vote by', mentioned)
                voted.addField('Vote to', message.author)
                client.channels.get("577679776643285004").send(voted)
            }).catch(() => {
                mentioned.send('انتهى الوقت');
            });
        });
    }
});
client.login("token")
