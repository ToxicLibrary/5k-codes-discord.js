client.on('message',message =>{
let command = message.content.split(" ")[0];
if (command == prefix + "nick") {
if(!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send(`You Don't has premisson`)
if(!message.guild.member(client.user).hasPermission('MANAGE_NICKNAMES')) return message.channel.send(`**I Don\'t have \`MANAGE_NICKNAMES\` Permission**`)
var user = message.guild.members.get(message.content.split(" ")[1]) || message.mentions.members.first();
let MrNono = message.content.split(" ").slice(2).join(" ");
if(!user) return message.channel.send(`**:rolling_eyes: I can't find this member**`);
if(!MrNono) {
user.setNickname("",`By : ${message.author.tag}`)
.catch(MrNoNo =>{});
return message.channel.send(`**? ${user}'s nick has been reset.**`);
}user.setNickname(MrNono,`By : ${message.author.tag}`)
.catch(NoNo =>{});
message.channel.send(`? Done changed ${user} nickname to **\`${MrNono}\`**`);}});
