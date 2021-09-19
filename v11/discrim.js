client.on('message', message => {
if(message.content.startsWith('-discrim') ) {
     if(!message.channel.guild) return message.reply('** This command only for servers **')
     
          var args = message.content.split(" ").slice(1);
    let sent = 0
	let count = 1;
	
      if(args){
client.users.filter(u => u.discriminator == args[0]).forEach(u => {
    if(sent > 4){
     return
    }
    sent = sent + 1
      message.channel.send(`
      ** ${count}? ${u.tag}**
         
      `)
      count++;
   
      })
      } 
      
}

if(message.content ===('-discrim') ) {
     if(!message.channel.guild) return message.reply('** This command only for servers **')
  let sent = 0
	let count = 1;
          

client.users.filter(u => u.discriminator == message.author.discriminator).forEach(u => {
    if(sent > 4){
        return
    }
    sent = sent + 1
      message.channel.send(`
      ** ${count}? ${u.tag}**
         
      `)
      count++;
   
      })
          
      }

 
});
