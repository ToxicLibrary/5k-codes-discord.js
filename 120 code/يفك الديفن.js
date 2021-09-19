client.on("message", (message) => {
    const command = message.content.split(" ")[0];
    const args = message.content.split(" ").slice();
  if(command === "$"){
       let member = message.mentions.users.first(); 
    message.guild.members.get(member.id).setDeaf(null);
   }
}).catch(console.error);