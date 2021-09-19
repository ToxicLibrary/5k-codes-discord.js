var prefix = "$";
client.on('message', message => {
 if(message.content === prefix + "سكر الروم") {
  if(!message.channel.guild) return message.reply('** هذه الاوامر فقط لل سيرفرات **');
   if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(' **__ليس لديك صلاحيات__**');
    message.channel.overwritePermissions(message.guild.roles.find("name", "اسم الرتبة"), {SEND_MESSAGES: false})
    message.channel.overwritePermissions(message.guild.roles.find("name", "اسم الرتبة"), {SEND_MESSAGES: false})
        //يمديك تنسخ السطر وتلصقه تحت
    .then(() => {
   message.reply("**__تم تقفيل الشات__ :white_check_mark: **")
   });
  }
    if(message.content === prefix + "افتح الروم") {
  if(!message.channel.guild) return message.reply('** هذه الاوامر فقط لل سيرفرات **');
   if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('**__ليس لديك صلاحيات__**');
    message.channel.overwritePermissions(message.guild.roles.find("name", "نفس اسم الرتبة الي فوق"), {SEND_MESSAGES: true})
    message.channel.overwritePermissions(message.guild.roles.find("name", "نفس اسم التبة الي فوق"), {SEND_MESSAGES: true})
    //يمديك تنسخ السطر وتلصقه تحت
    .then(() => {
   message.reply("**__تم فتح الشات__:white_check_mark:**")
   });
   }
});