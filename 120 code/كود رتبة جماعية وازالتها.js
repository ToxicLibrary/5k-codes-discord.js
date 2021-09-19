client.on('message', message => {
    if (!message.channel.guild) return;
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("***  ليس معك صلاحيات  ***")
    var prefix = "$";
       if (message.content ===   prefix + "add role") {
    message.channel.send("<@" + message.author.id + ">  ***  جاري اعطاء الرتبة للاعضاء كما امرت  *** ")
    message.guild.members.forEach(m => {
    m.addRole(message.guild.roles.find('name', 'اسم الرتبة'))
    })
    }
    
       if (message.content ===   prefix + "remove role") {
    message.channel.send("<@" + message.author.id + ">  ***  جاري اعطاء الرتبة للاعضاء كما امرت  *** ")
    message.guild.members.forEach(m => {
    m.removeRole(message.guild.roles.find('name', 'اسم الرتبة'))
    })
    }
    
    });