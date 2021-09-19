
client.on('message' , message => {
  var prefix = ".";
  if(message.author.bot) return;
  
  if(message.content.startsWith(prefix + "xo")) {
  let array_of_mentions = message.mentions.users.array();
  let symbols = [':o:', ':heavy_multiplication_x:']
  var grid_message;
  
  if (array_of_mentions.length == 1 || array_of_mentions.length == 2) {
  let random1 = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
  let random2 = Math.abs(random1 - 1);
  if (array_of_mentions.length == 1) {
  random1 = 0;
  random2 = 0;
  }
  let player1_id = array_of_mentions[random1].id;
  let player2_id = array_of_mentions[random2].id;
  var turn_id = player1_id;
  var symbol = symbols[0];
  let initial_message = `Match Between <@${player1_id}> و <@${player2_id}>!`;
  if (player1_id == player2_id) {
  initial_message += '\n_(From the loser, you play this role with yourself :joy:)_'
  }
  message.channel.send(`xo! ${initial_message}`)
  .then(console.log("Successful tictactoe introduction"))
  .catch(console.error);
  message.channel.send(':one::two::three:' + '\n' +
                  ':four::five::six:' + '\n' +
                  ':seven::eight::nine:')
  .then((new_message) => {
  grid_message = new_message;
  })
  .then(console.log("Successful xo game initialization"))
  .catch(console.error);
  message.channel.send('Loading... Wait for the reaction: :ok:')
  .then(async (new_message) => {
  await new_message.react('1⃣');
  await new_message.react('2⃣');
  await new_message.react('3⃣');
  await new_message.react('4⃣');
  await new_message.react('5⃣');
  await new_message.react('6⃣');
  await new_message.react('7⃣');
  await new_message.react('8⃣');
  await new_message.react('9⃣');
  await new_message.react('🆗');
  await new_message.edit(`its turn <@${turn_id}> Your tag is${symbol}`)
  .then((new_new_message) => {
  require('./alpha.js')(client, message, new_new_message, player1_id, player2_id, turn_id, symbol, symbols, grid_message);
  })
  .then(console.log("Successful xo listener initialization"))
  .catch(console.error);
  })
  .then(console.log("Successful xo react initialization"))
  .catch(console.error);
  }
  else {
  message.reply(`(Use This: ${prefix}xo @player1 @player2)`)
  .then(console.log("Successful error reply"))
  .catch(console.error);
  }
  }
  });
  client.on('message', message => {
  let args = message.content.split(' ').slice(1);
  if(message.content.split(' ')[0] == '.color'){
  const embedd = new Discord.RichEmbed()
  .setFooter('Requested by '+message.author.username, message.author.avatarURL)
  .setDescription(`**No Color With This Name/Number ** :x: `)
  .setColor(`ff0000`)
  
  if(!isNaN(args) && args.length > 0)
  
  
  if    (!(message.guild.roles.find("name",`${args}`))) return  message.channel.sendEmbed(embedd);
  
  
  var a = message.guild.roles.find("name",`${args}`)
   if(!a)return;
  const embed = new Discord.RichEmbed()
  
  .setFooter('Requested by '+message.author.username, message.author.avatarURL)
  .setDescription(`**Done , Your Colors Has Been Changed . :white_check_mark: **`)
  
  .setColor(`${a.hexColor}`)
  message.channel.sendEmbed(embed);
  if (!args)return;
  setInterval(function(){})
     let count = 0;
     let ecount = 0;
  for(let x = 1; x < 201; x++){
  
  message.member.removeRole(message.guild.roles.find("name",`${x}`))
  
  }
   message.member.addRole(message.guild.roles.find("name",`${args}`));
  
  
  }
  });