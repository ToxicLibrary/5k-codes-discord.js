const Discord = require("discord.js");
const client = new Discord.Client();
var database = {};// AKAME
// íÇ ÑÌÇá , ÎĞÊ ÓÑÇæíáí , ŞÇáÊ ãÚáÓÔ ßäÊ ÇÍÓÈå áæÊ (:
// lol wut u looking at ? launch this fuckincode!
var config = require('./config.json');// AKAME
client.login(config.token).then(async function() {
   console.log(`im ready at ${client.user.username}`);// AKAME
   console.log('Developed by - M?l , A K A M E ?#5555');
});// AKAME
client.on('message', async message => {
    // i said , Best Arabic Developer is ABADY .
   if (!message.content.startsWith(config.prefix + "register")) return undefined;
   if (database[message.author.id]) return message.channel.send(`You have data already please try ${config.prefix}idenity`);
   var xfilter = (reaction, user) => {
                return reaction.emoji.name === `?` && user.id === message.author.id;// AKAME
            };
   var tfilter = (reaction, user) => {
                return reaction.emoji.name === `?` && user.id === message.author.id;// bitchhh stop ! u clearing my copyrights! thats not good!
            };
   var args = message.content.split(" ").slice(1);
   var name = args[0];
   var age = args[1];// AKAME
   var country = args[2];
   if (!name || !age || !country) return message.channel.send({embed: new Discord.RichEmbed()
       .setColor("#36393e")
       .setDescription(`**Example; \`${config.prefix}register [name] [age] [country]\`**`)// why smartuteam devs better than arabic devs? u didn't know nah .
   });
   var embed = new Discord.RichEmbed()
   .setColor("#36393e")// AKAME
   .setTimestamp()
   .setAuthor(`${message.author.username} Apply;`,message.author.displayAvatarURL)
   .setDescription(`\`\`\`apache\nName; ${name}\nAge; ${age}\nCountry; ${country}\`\`\``);// AKAME
   var awaited = await message.channel.send(embed);
   await awaited.react("?");
   await awaited.react("?");// AKAME
   var truecoll = awaited.createReactionCollector(tfilter, {
                max: 1
            });
   var xcoll = awaited.createReactionCollector(xfilter, {
                max: 1
            });
    xcoll.on('collect', async resp => {// AKAME
      does("nope");
        
    });
    truecoll.on('collect', async resp => {
    does("yes");
    });
    var room = client.channels.get(config.apply);// reeebeeeeeeeeel! stoooooooooooooooooooooooop! u steal my code right now , that is not good . Liar . 
    var does = async function(some) {
      if (some == "nope") return awaited.delete();
      var data = new Discord.RichEmbed()
      .setColor("#36393e")
      .setThumbnail(message.author.displayAvatarURL)
      .setAuthor(`${message.author.tag}`)
      .setTimestamp()
      .setFooter(`Applied At;`,client.user.displayAvatarURL)
      .setDescription(`:sparkles: | ${message.author} \n**Name;** ${name}\n**Age;** ${age}\n**Country;** ${country}\n\`\`\`UserID; ${message.author.id}\`\`\``);
      var mes = await room.send(data);
      awaited.edit({embed: data
          .setDescription(`Your apply will accepted soon , thanks for apply!`)
      });
      awaited.clearReactions();
      createColl(mes.id);
    };// AKAMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    var createColl = async function(amessage) {
      amessage = await room.fetchMessage(amessage);  
      var sfil = (reaction,user) => reaction.emoji.name === `?` && user.id != client.user.id;
      var tfil = (reaction,user) => reaction.emoji.name === `?` && user.id != client.user.id;
      await amessage.react("?");
      await amessage.react("?");
   var truecoll = amessage.createReactionCollector(tfil,{
                max: 1
            });
   var xcoll = amessage.createReactionCollector(sfil,{
                max: 1
            });
    xcoll.on('collect', async resp => {
      amessage.delete();// AKAME
      message.author.send(`You have been canceled by staff , your idenity card is not imporved`);// arabic devs , u know . arabic devs , you don't want to be like them . be better!
    });
    truecoll.on('collect', async resp => {
    amessage.delete();
    database[message.author.id] = {status:true,name: name, age: age,country: country};// AKAME
    var us = database[message.author.id];
    var idenity = new Discord.RichEmbed()// AKAME
    .setColor("#36393e")
    .setTimestamp()
    .setFooter(client.user.username,client.user.displayAvatarURL)
    .setThumbnail(message.author.displayAvatarURL)
    .setDescription(`**${message.author} | :leaves: \nTake your idenity card**\`\`\`apache\nName; ${us.name}\nAge; ${us.age}\nCountry; ${us.country}\`\`\``);
    message.author.send(`You Have Been accepted by staff , oho take ur idenity-card ;`);//i don't give a shit. 
    message.author.send(idenity);
    
    });// AKAME
    };
}).on('message', message => {
    if (!message.content.startsWith(config.prefix + "idenity")) return undefined;
    //Alpha wasn't good.
     var user = message.mentions.users.first() || message.author;
     user.data = database[user.id];
     if (!user.data) return message.channel.send(`${user} dont have any data try ${config.prefix}register`);
     var data = new Discord.RichEmbed()
     .setColor("#36393e")
     .setTimestamp()
     .setThumbnail(user.displayAvatarURL)
     .setFooter(client.user.username,client.user.displayAvatarURL)
     .setDescription(`** ${user} idenity card; ** | :sparkles:\n\`\`\`apache\nName; ${user.data.name}\nAge; ${user.data.age}\nCountry; ${user.data.country}\`\`\``);
     message.channel.send(data);
     // end d; lol my code like notes , don't care. 
});