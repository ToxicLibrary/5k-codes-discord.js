const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const ms = require('ms')
const path = require("path");
const giveaways = require("discord-giveaways")
const prefix = "#g";
client.on("ready", () => {
    console.log("I'm ready !");
    giveaways.launch(client, {
        updateCountdownEvery: 5000,
        botsCanWin: false,
        embedColor: "#b9184e",
        embedColorEnd: "#000000",
       reaction: "🎉",
        storage: __dirname+"/giveaways.json"

    });
});




let botversion = ('^v5.56.4')

var edbl = require ('edbl.js');


client.on("message", async message => {
if (message.author.bot || message.channel.type == 'dm') return undefined;
if (message.content.startsWith(prefix + 'bot')) {
edbl.getUser ('510970297814614016').then (async (UserInfo) => {
  console.log (UserInfo); // returns BotClass;
});
}
})

client.on("message", async message => {
if (message.author.bot || message.channel.type == 'dm') return undefined;
  if (message.member.hasPermission('MANAGE_GUILD') || message.member.roles.find(r => r.name == 'Giveaways')) {
let args = message.content.split(" ").slice(1)
let prize = message.content.split(" ").slice(3).join(" ")
if (message.content.startsWith(prefix + 'start')) {
if(!args[0])return message.reply(`:x: Time Pleace | \`example: 1d (1day) / 1m (1minute) / 1h (1hour) / 1s (1seconds)\` `);//// عشان لو مكتبش الوقت 
if(args[0] === '5s' || args[0] === '4s' || args[0] === '3s' || args[0] === '2s' || args[0] === '1s' || args[0] === '0s') return message.channel.send("You must indicate a time greater than 5s!")
if(!args[1])return message.reply(`:x: Wrong! How many winners? | \`example: #gstart 1m 2 Good prize \``)
//if(isNaN(args[1]))return message.reply(`:x: **What? | The winner is not a number  \`example: #gstart 1m 2 Good prize \`**`)
if(!prize)return message.reply(`:x: Add the prize? | ** \`example: ${prefix}gstart 1m 2w Good prize \``)
giveaways.start(message.channel, {
    time: ms(args[0]),
    prize: prize,
    winnersCount: parseInt(args[1]),
    messages: {
     giveaway: "> 🎉 - Toxic Giveaway __Start__",
        giveawayEnded: "> 🎉 - Toxic Giveaway __End__",
     timeRemaining: `Tim End : \`{duration}\` 
Hosted By : <@${message.author.id}>`,       
 inviteToParticipate: "React with 🎉 to enter!",
        winMessage: "Congratulations, {winners}! You won **{prize}**!",
        embedFooter: "Giveaways",
       noWinner: "A winner could not be determined! ",
       endedAt: "Ends at", 
       winners: "Winner",
        units: {
            seconds: "seconds",
            minutes: "minutes",
            hours: "hours",
            days: "days"

        }
    }
});
  }
if (message.content.startsWith(prefix + 'reroll')) {
let messageID = args[0];
if(!args[0])return message.reply(`:x: **Please add the id Message of the giveaway | \`example: ${prefix}greroll <id Message>\`** `);
        giveaways.reroll(messageID).then(() => {
            message.channel.send("**Success! Giveaway rerolled! :white_check_mark:**");
        }).catch((err) => {
            message.channel.send("**No giveaway found for "+messageID+", please check and try again :x:**");
        });
}
if (message.content.startsWith(prefix + 'end')) {
        let messageID = args[0];
            if(!messageID){
if(!args[0])return message.reply(`:x: **Please add the id Message of the giveaway | \`example: #gend <id Message>\`** `);
            }
            try {
                giveaways.edit(messageID, {
                    setEndTimestamp: Date.now()
                });
         message.channel.send("**Success! Giveaway end! :white_check_mark:**");
            } catch(e){
            message.channel.send("**No giveaway found for "+messageID+", please check and try again :x:**");
            }
}
if (message.content.startsWith(prefix + 'delete')) {
        let messageID = args[0];
if(!args[0])return message.reply(`:x: **Please add the id Message of the giveaway | \`example: #gdel <id Message>\`** `);
        giveaways.delete(messageID).then(() => {
         message.channel.send("**Success! Giveaway deleted! :white_check_mark:**");
        }).catch((err) => {
            message.channel.send("**No giveaway found for "+messageID+", please check and try again :x:**");
        });
}
if (message.content.startsWith(prefix + 'invite')) {
message.channel.send(`:tada: Hello! I'm **${client.user.username}**! I help to make giveaways quick and easy!
You can add me to your server with this link:

:link: https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=519232&scope=bot

Check out my commands by typing \`\`${prefix}help\`\``);
}
if (message.content.startsWith(prefix + 'ping')) {
    const msg = await message.channel.send(`Pinging....`);
    msg.edit(`
        Time taken: ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms | Websocket: ${Math.round(client.ping)}ms`);
}
if (message.content.startsWith(prefix + 'help')) {
message.channel.send(`:tada: __**Toxic Giveaways** :tada: commands:__


${prefix}prefix  - Displays or changes the server prefix.
${prefix}about  - Shows info about the bot.
${prefix}help  - Shows the bot's commands.
${prefix}invite  - Shows how to invite the bot.
${prefix}ping  - Test the bot's response time.
${prefix}end <messageId> - Ends (picks a winner for) the last or specified giveaway in the current channel.
${prefix}edit <messageId> - Edit Giveaway Prize Or Winners Count.
${prefix}reroll <messageId> - Re-rolls the specified giveaway in the current channel.
${prefix}start <time> [winners]w [prize] - Start a new giveaway (quick setup).


Do not include <> nor [] - <> means required and [] means optional.
For additional help, join our support server: discord.gg/eWBGfqe`);
  }
  }
}) 
client.on('message', async message => { 
  if(message.content.startsWith(prefix + "create")) {
    if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(`:x: | You don't have acces to use this command!**`);
    message.channel.send(`:tada: Alright! Let's set up your giveaway! First, what channel do you want the giveaway in?
You can type cancel at any time to \`\`cancel\`\` creation.

\`\`Please type the name of a channel in this server.\`\``).then(msg => {
   var filter = m => m.author.id === message.author.id;
     message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
if(collected.first().content === "cancel") return message.channel.send(`Done`)
let room = message.guild.channels.find(c => c.name == collected.first().content);
        if(!room) return message.channel.send(`:x: | **I can not find that channel, sorry type the name please!**`);
        room = collected.first().content;
        collected.first().delete();
        msg.edit(` Sweet! The giveaway will be in #${room}! Next, how long should the giveaway last?
\`\`Please enter the duration of the giveaway in seconds.
Alternatively, enter a duration in minutes and include an M at the end, or days and include a D.\`\``).then(msg => {
     message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        if(!collected.first().content.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send(`:x: | **Our Bot is not supporting this time!**`);
          var duration = collected.first().content
            collected.first().delete();
        msg.edit(`:tada: Neat! This giveaway will last 1 minute! Now, how many winners should there be?
\`\` Please enter a number of winners between 1 and 20.\`\``).then(msg => {
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
          }).then(collected => {
         var winners = collected.first().content
            collected.first().delete();
            msg.edit(`**Now please type the prize!**`).then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
               var title = collected.first().content;
                collected.first().delete();
                msg.delete();
                message.delete();
giveaways.start(message.guild.channels.find(c => c.name == room), {
    time: ms(duration),
    prize: title,
    winnersCount: parseInt(winners),
    messages: {
     giveaway: "> 🎉 - Toxic Giveaway __Start__",
        giveawayEnded: "> 🎉 - Toxic Giveaway __End__",
     timeRemaining: `Tim End : \`{duration}\` 
Hosted By : <@${message.author.id}>`,       
 inviteToParticipate: "React with 🎉 to enter!",
        winMessage: "Congratulations, {winners}! You won **{prize}**!",
        embedFooter: "Giveaways",
       noWinner: "A winner could not be determined! ",
       endedAt: "Ends at", 
       winners: "Winner",
        units: {
            seconds: "seconds",
            minutes: "minutes",
            hours: "hours",
            days: "days"

        }
    }
});
              });
              });
              });
            });
          });
        });
      });
    });
  }
})
client.on('message', async message => { 
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
   var win = '';
    var prize = '';
    var filter = m => m.author.id === message.author.id;
    var args = message.content.toLowerCase().split(" "); 
  if (message.content.startsWith(prefix + 'edit')) {
    let messageID = args[1];
    if(!args[1])return message.reply(`**Please add the id Message of the giveaway  \`example: ${prefix}edit <id Message> \`** `);
      let Gaber = new Discord.RichEmbed()
      .setTitle("**Edit Giveaway**")
     .setDescription(`**
     1️⃣ | To Edit Winners
     2️⃣ | To Edit Prize
     **`)
     message.channel.send(Gaber).then(msg => {
        msg.react('1️⃣')
      .then(() => msg.react('2️⃣'))
        let reaction1Filter = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id;
        let reaction2Filter = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === message.author.id;
        let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
        let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
        reaction1.on("collect", r => {
            message.channel.send(`**Put the number of winners**`).then(msgS => {

          message.channel.awaitMessages(filter, { max: 1, time: 80000, errors: ['time'] }).then(collected => {

                win = collected.first().content;
              message.edit("")  
if(isNaN(win))return message.reply(`**What? <a:worng:618171880855044129> The winner is not a number <a:wt:618171734830350343>**`)

              giveaways.edit(messageID, {
                newWinnersCount: win,
                        })
                  message.channel.send(`**Done, Change Winners To ${win}**`)
    })       
                    reaction2.on("collect", r => {
                        message.channel.send(`**Write the new prize**`).then(msgS => {

          message.channel.awaitMessages(filter, { max: 1, time: 80000, errors: ['time'] }).then(collected => {

                prize = collected.first().content;
              message.edit("")  

              giveaways.edit(messageID, {
                newPrize: prize,

                        })
                  message.channel.send(`**Done, Change prize To ${prize}**`)
                            })
                    })
                
                })
            })
        })
    })

    
    }

});

     






/*module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**<a<a:worng:618171880855044129>618171880855044129> Sorry, you need the `MANAGE_MESSAGES` permission**')
        if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("** <a<a:worng:618171880855044129>618171880855044129> I Don't Have `MANAGE_MESSAGES` Permission**").then(msg => msg.delete(6000))
    
            let messageID = args[0];
    if(!args[0])return message.reply(`**Please add the id Message of the giveaway <a<a:worng:618171880855044129>618171880855044129> \`example: #gedit <id Message> \`** `);
    if(!args[1])return message.reply(`**Please add  winners and Prize <a<a:worng:618171880855044129>618171880855044129> \`example: #gedit <id Message> <Winners> <Prize> \`<a<a:true:618171648394264581>618171648394264581>** `)
    
                if(!messageID){
    if(!args[0])return message.reply(`**Please add the id Message of the giveaway <a<a:worng:618171880855044129>618171880855044129> \`example: #gend <id Message>\`** `);
                }
                try {
              giveaways.edit(messageID, {
                newWinnersCount: args[1],
                newPrize: args[2],
      
                    });
             message.channel.send("**Success! Giveaway end! <a<a:true:618171648394264581>618171648394264581>**");
                } catch(e){
                message.channel.send("**No giveaway found for "+messageID+", please check and try again <a<a:worng:618171880855044129>618171880855044129>**");
                }
            
            }*/
/*module.exports.run = async (client, message, args) => {
    var win = '';
    var prize = '';
    var filter = m => m.author.id === message.author.id;
      let messageID = args[0];
    if(!args[0])return message.reply(`**Please add the id Message of the giveaway <a<a:worng:618171880855044129>618171880855044129> \`example: #gedit <id Message> \`** `);
      let FireKing1 = new Discord.RichEmbed()
      .setTitle("**Edit Giveaway**")
     .setDescription(`**
     📬 | xx=--
     📇 | x
     **`)
      message.channel.send(FireKing1) .then(msg=> {
msg.react("624643988376387614").then(r => {
            msg.react("624643956352745494")
     
                  let prize = (reaction, user) => reaction.emoji.name === 'GG2' && user.id === message.author.id;
                let winn = (reaction, user) => reaction.emoji.name === 'hh' && user.id === message.author.id;
                                            let win = d.createReactionCollector(winn);
                                            let prize11 = d.createReactionCollector(prize);
                                            let worng1 = d.createReactionCollector(worng);
            const prize11 = msg.createReactionCollector(prize, { time: 60000 });
   const win11 = msg.createReactionCollector(winn, { time: 60000 });
    
           worng1.on('collect', r => {
  
                 message.delete();
      
 prize11.on("collect", r => {
  message.channel.send(`Put the number of winners`).then(msgS => {
          message.channel.awaitMessages(filter, { max: 1, time: 80000, errors: ['time'] }).then(collected => {
                win = collected.first().content;
                        collected.first().delete();
              message.edit("")  
//if(isNaN(win))return message.reply(`**What? <a:worng:618171880855044129> The winner is not a number <a:wt:618171734830350343> \`example: #gstart 1m 2 Good prize \`**`)
              giveaways.edit(messageID, {
                newWinnersCount: win,
                
              
                                     
});
            win11.on("collect", r => {
  message.channel.send(`Put the number of winnersثصثصث`).then(msgS => {
          message.channel.awaitMessages(filter, { max: 1, time: 80000, errors: ['time'] }).then(collected => {
                prize = collected.first().content;
                        collected.first().delete();
              message.edit("")  
              giveaways.edit(messageID, {
                newPrize: prize,
                }, 5000);       });
        
              
                                     
})          
  
  })
  })
  
  })
})
})
 
  })
  
      
 
}
    */

        
           /*      module.exports.run = async (client, message, args) => {
    var win = '';
    var prize = '';
  if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
 
    var args = message.content.toLowerCase().split(" "); // Alpha Codes Server.
    var filter = m => m.author.id === message.author.id;
      let messageID = args[0];
    if(!args[0])return message.reply(`**Please add the id Message of the giveaway <a<a:worng:618171880855044129>618171880855044129> \`example: #gedit <id Message> \`** `);
      let FireKing1 = new Discord.RichEmbed()
      .setTitle("**Edit Giveaway**")
     .setDescription(`**
     <a:GG2:624643988376387614> | To Edit Winners
     <a:hh:624643956352745494>  | To Edit Prize
     **`)
      message.channel.send(FireKing1)
            .then(msgB => {
                    msgB.react('✅').then(() => msgB.react('❎'))
                   
                    let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
                    let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                    let send = msgB.createReactionCollector(sendR);
                    let dontSend = msgB.createReactionCollector(dontSendR);
                   
                   
                   
    send.on('collect', r => {
  message.channel.send(`**Put the number of winners**`).then(msgS => {
          message.channel.awaitMessages(filter, { max: 1, time: 80000, errors: ['time'] }).then(collected => {
                win = collected.first().content;
              message.edit("")  
if(isNaN(win))return message.reply(`**What? <a:worng:618171880855044129> The winner is not a number <a:wt:618171734830350343>**`)
              giveaways.edit(messageID, {
                newWinnersCount: win,
                        })
                  message.channel.send(`**Done, Change Winners To ${win}**`)
                        })
                    })
          dontSend.on('collect', r => {
                    msgB.delete();
                    message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
                })
            })
         
                        })
                    
  
      }*/

client.login(`NjU2MzU0NTc3MDA3OTAyNzIx.XfhcfA.q2RSzEXBHZ18Dfc0h8iQ6VQe_1c`)