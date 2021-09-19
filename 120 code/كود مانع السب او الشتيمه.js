client.on('message',function(message) {
    if(!message.channel.guild) return undefined;
    const swearWords = ["الشتيمه الي تريد منعه","الشتيمه الي تريد منعه","الشتيمه الي تريد منعه","الشتيمه الي تريد منعه"];
    if (swearWords.some(word => message.content.includes(word)) ) {
      message.delete()
      message.reply("**ممنوع السب**"); 
    }
  });