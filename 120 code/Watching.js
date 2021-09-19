client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} !`);
          client.user.setActivity("you",{type: 'WATCHING'});
  
  });
  //npm i -S hydrabolt/discord.js