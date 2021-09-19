client.on('message', message=>{
    if (message.content ===  "هنا الكلمه الي تخليه يطلع"){
    message.guild.leave();
            }
});