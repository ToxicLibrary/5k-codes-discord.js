// Load modules
const Discord = require("discord.js"),
backup = require("discord-backup"),
client = new Discord.Client(),
prefix = "$"
 
client.on("ready", () => {
console.log("I'm ready !");
});
 
client.on("message", async message => {
let command = message.content.toLowerCase().slice(prefix.length).split(" ")[0];
let args = message.content.split(" ").slice(1);
if(!message.content.startsWith(prefix) || message.author.bot || !message.guild) return undefined;
if(command === "backup-create"){
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**❌ | انت لا تملك صلاحية لصنع نسخة احطياطية من السيرفر**");
message.channel.send("**♻ | جاري عامل نسخة من السيرفر**").then(e=>{
backup.create(message.guild, {jsonBeautify: true}).then((backupData) => {
message.author.send(`>>> **Backup: \`\`${backupData.id}\`\`**`);
e.edit("**✅ | تم بنجاح**");
});
})
}
if(command === "backup-load") {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**❌ | انت لا تملك صلاحية لصنع نسخة احطياطية من السيرفر**");
let backupID = args[0];
if(!backupID) return message.channel.send(`**✅ | Using: \`\`${prefix}backup-load [Backup ID]\`\`**`);
backup.fetch(backupID).then(async () => {
message.channel.send(`**♻ | راح يتم مسح كل شئ من رتب و رومات الخ... للتأكيد اكتب \`${prefix}confirm\`**`);
await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === prefix + "confirm"), {
max: 1,
time: 20000,
errors: ["time"]
}).catch((err) => {
return message.channel.send("**❌ | لقد انتهي الوقت.**");
});
message.author.send("**✅ | جاري السترجاع الباك اب**").then(e=>{e.edit("**✅ | تم بنجاح**")});
backup.load(backupID, message.guild).then(() => {
backup.remove(backupID);
}).catch((err) => {
return message.author.send("**❌ | من فضلك اعطيني رتبة `ADMINISTRATOR` لأسترجاع الباك اب**");
});
}).catch((err) => {
return message.channel.send("**❌ | لا يوجد باك اب بهذا الايدي "+backupID+"`**");
});
}
if(command === "help"){
let embed = new Discord.RichEmbed()
.setDescription(`>>> **\`\`${prefix}backup-create\`\` => لأنشاء باك اب
\`\`${prefix}backup-load\`\` => لأسترجاع الباك اب
**`)
.setColor("BLUE")
.setTimestamp()
message.channel.send(embed);
}
});
 
client.login("Njg3Mzc0NDU3MzgzNTUwOTk3.Xmk1ag.lRmy3Y00QWIuqlAZr5WPMQzVx3c");
