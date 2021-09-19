client.on('message', async message => {
    
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith("$$delete colors")) {
if(!message.member.hasPermission('ADMINISTRATOR')) return
let role = message.guild.roles.find('name', 'رقم الون');

role.delete()
}

});