const pretty = require("pretty-ms");

const Discord = require("discord.js");
const moment = require('moment');
const client = new Discord.Client();
const bot = new Discord.Client();
const hero = client;
const fs = require("fs");
botconfig = JSON.parse(fs.readFileSync('./jsonfile/botconfig.json', 'utf8'));
client.login(botconfig.token)
const ms = require("ms");
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
const prefix = botconfig.prefix



var mysql = require("mysql")

var db_config = {
  host: "localhost",
  user: "root",
  password: "SSbboott11",
  database: "SBot"
}
var con;
client.on('warn', console.warn);

client.on('error', console.error);

function handleDisconnect() {
  con = mysql.createConnection(db_config);

  con.connect(function(err) {
    if(err) {
      console.log("IJS Found error to connect to the database: ", err);
      setTimeout(handleDisconnect, 2000); 
    } else {
      console.log("\033[92m%s\x1b[0m", "Success: " + "\x1b[0mIJS - Database connected successfully!");
    }

  });
  con.on('error', function(err) {
    console.log('db error');
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();
    } else {
          throw err;
    }
  });
}

handleDisconnect();

client.on('message', async function(message) {
    const cmd = (a,b,c,d) => {
        return;
        }
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
      con.query(`SELECT * FROM top WHERE gid = '${message.guild.id}' AND id = '${message.author.id}'`, (e, rows) => {
        if(e) throw e;
        if(!rows || !rows[0] || rows.lenght < 0) {
          con.query(`INSERT INTO top (id, gid, txp) VALUES ('${message.author.id}', '${message.guild.id}', 1)`);
        } else {
          if(message.content === "confirm") return;
            con.query(`UPDATE top SET txp = ${parseInt(rows[0].txp)+1} WHERE id = '${message.author.id}' AND gid = '${message.guild.id}'`)
        }
      })
  if(message.content.toLowerCase() === prefix + "top") {
    cmd("top", "Send a leaderboard for all active members in the server", "top", "Info");
    //
    con.query(`SELECT * FROM top WHERE gid = '${message.guild.id}' ORDER BY txp DESC`, (e, rows) => {
      con.query(`SELECT * FROM top WHERE gid = '${message.guild.id}' ORDER BY vxp DESC`, (e, rowa) => {
    var text = '';
    var voice = '';
  for(var i = 0; i < 5; i++) {
    if(rows[i]) {
      let user = client.users.get(rows[i].id);
     
      let is = '';
      if(rows[i].id == message.author.id) {
        is = "**"
      } else {
        is = '';
      }
  
       text += `${is}#${parseInt(i)+1} | <@${rows[i].id}> XP: \`${rows[i].txp}\`${is}\n` 
  
    }
      }
   for(var i = 0; i < 5; i++) {
      if(rowa[i]) {
        let user = client.users.get(rowa[i].id);
       
        let is = '';
        if(rowa[i].id == message.author.id) {
          is = "**"
        } else {
          is = '';
        }
          voice += `${is}#${parseInt(i)+1} | <@${rowa[i].id}> XP: \`${rowa[i].vxp}\`${is}\n` 
    
      }
        }
    
   
  const embed2 = new Discord.RichEmbed()
  
  .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
  .setColor(" #191919")
  .addField(`**:speech_balloon: | TOP 5 TEXT**`, `${text}  \n  **:thinking: | For More: \`${prefix}top text\`**`, true)
  .addField("**:microphone2: | TOP 5 VOICE**", `${voice} \n **:thinking: | For More: \`${prefix}top voice\`**`, true)
  .setFooter(message.author.tag, message.author.displayAvatarURL)
  
  message.channel.send(embed2)
    
  })
    })
  }
      if(message.content.toLowerCase() === (prefix + 'top text')) {
        cmd("top text", "Send a leaderboard for all active members in the server", "top text", "Info");
        con.query(`SELECT * FROM top WHERE gid = '${message.guild.id}' ORDER BY txp DESC`, (e, rows) => {
          var text = '';
          
         {
          for (var i = 0; i < 10; i++) {
  
            if(rows[i]) {
              let user = client.users.get(rows[i].id);
             
              let is = '';
              if(rows[i].id == message.author.id) {
                is = "**"
              } else {
                is = '';
              }
          
  
               text += `${is}#${parseInt(i)+1} <@${rows[i].id}> XP: \`${rows[i].txp}\`${is}\n` 
          
            }
        }
  
        const embed2 = new Discord.RichEmbed()
  
        .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
  .setColor(" #191919")
        .addField(`**:speech_balloon: | TEXT LEADERBOARD**`, `${text}`, true)
  
        .setFooter(message.author.tag, message.author.displayAvatarURL)
  
        message.channel.send(embed2)
          }
        })
      }
      if(message.content.toLowerCase() === (prefix + 'top voice')) {
        cmd("top voice", "Send a leaderboard for all active members in the server", "top voice", "Info");
        con.query(`SELECT * FROM top WHERE gid = '${message.guild.id}' ORDER BY vxp DESC`, (e, rows) => {
          var text = '';
          var voice = '';
         for(var i = 0; i < 10; i++){
          if(rows[i]) {
            let user = client.users.get(rows[i].id);
           
            let is = '';
            if(rows[i].id == message.author.id) {
              is = "**"
            } else {
              is = '';
            }
        
  
             text += `${is}#${parseInt(i)+1} <@${rows[i].id}> XP: \`${rows[i].vxp}\`${is}\n` 
        
          }
        }
        const embed2 = new Discord.RichEmbed()
  
        .setAuthor("📋 | Guild Score Leaderboards", message.guild.iconURL)
  .setColor(" #191919")
        .addField(`**:microphone2: | VOICE LEADERBOARD**`, `${text}`, true)
  
        .setFooter(message.author.tag, message.author.displayAvatarURL)
  
        message.channel.send(embed2)
          
        })
      }
  
  con.query(`SELECT * FROM top WHERE gid='${message.guild.id}'`, (err, rows) => {
      if(message.content === prefix + "reset all") {
        if(!message.member.hasPermission("MANAGE_GUILD")) return;
        message.channel.send("**:warning: | لتأكيد عملية تصفير جميع النقاط , قم بكتابة : ```confirm```**").then(async msg => {
          try{
          let conf = await message.channel.awaitMessages(m => m.content === "confirm", { max: 1, time: 20000, errors: ["time"]}).then(c => {
            message.delete();
              msg.edit(`** | تم تصفير جميع النقاط**`);
              con.query(`UPDATE top SET txp=0 WHERE gid = '${message.guild.id}'`)
              con.query(`UPDATE top SET txp=0 WHERE gid = '${message.guild.id}' AND id='${message.author.id}'`)
              con.query(`UPDATE top SET vxp=0 WHERE gid = '${message.guild.id}'`)
              con.query(`UPDATE top SET vxp=0 WHERE gid = '${message.guild.id}' AND id='${message.author.id}'`)
  
            })
          } catch(e) {
            message.delete();
          }
        })
        }
      if(message.content === prefix + "reset text") {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        message.channel.send("**:warning: | لتأكيد عملية تصفير جميع النقاط الكتابية , قم بكتابة : ```confirm```**").then(async msg => {
          try{
          let conf = await message.channel.awaitMessages(m => m.content === "confirm", { max: 1, time: 20000, errors: ["time"]}).then(c => {
            message.delete();
              msg.edit(`** | تم تصفير جميع النقاط**`);
              con.query(`UPDATE top SET txp=0 WHERE gid = '${message.guild.id}'`)
              con.query(`UPDATE top SET txp=0 WHERE gid = '${message.guild.id}' AND id='${message.author.id}'`)
        
  
            })
          } catch(e) {
            message.delete();
          }
        })
      }
      if(message.content === prefix + "reset voice") {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return;
        message.channel.send("**:warning: | لتأكيد عملية تصفير جميع النقاط الكتابية , قم بكتابة : ```confirm```**").then(async msg => {
          try{
          let conf = await message.channel.awaitMessages(m => m.content === "confirm", { max: 1, time: 20000, errors: ["time"]}).then(c => {
            message.delete();
              msg.edit(`** | تم تصفير جميع النقاط**`);
              
              con.query(`UPDATE top SET vxp=0 WHERE gid = '${message.guild.id}'`)
              con.query(`UPDATE top SET vxp=0 WHERE gid = '${message.guild.id}' AND id='${message.author.id}'`)
  
            })
          } catch(e) {
            message.delete();
          }
        })
      }
    })
  })
