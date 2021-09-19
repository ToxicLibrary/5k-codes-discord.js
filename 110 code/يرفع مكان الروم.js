client.on("message", (message) => {
    const command = message.content.split(" ")[0];
    const args = message.content.split(" ").slice();
  if(command === "."){
            let member = message.mentions.users.first(); 
    if(typeof args[1] !== "number")
message.channel.setPosition(args[1]).then(c => {
    message.channel.send("ok");
});
}
});//.catch(console.error);