exports.run = (client, message) => {
  if(!message.guild) return;
  if(message.author.bot) return;
addXP(message.guild, message.author, 1);
addMoney(message.guild, message.author, 1);

  
};

      