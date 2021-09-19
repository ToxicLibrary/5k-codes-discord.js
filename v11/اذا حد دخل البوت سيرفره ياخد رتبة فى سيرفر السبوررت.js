const Discord = require('discord.js')
const client = new Discord.Client()

client.on('guildCreate', guild => {
  let support = client.guilds.get('') // حط هنا ايدي سيرفر السبورت
  if(support === undefined) return
  let role = support.roles.find(r => r.name == 'user') // بدلها بأسم الرتبة يلي تبيها للمستخدمين
  let member = support.members.get(guild.owner.user.id) 
  if(member) {
    member.addRole(role)
  } else {
    console.log(`this user not in support server`)
  }
})