const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "/";
var fs = require("fs");
var lineReader = require("line-reader");
var async = require("async");
const firstline = require("firstline");
const generated = new Set();
bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});



bot.on("message", message => {
  if (message.channel.id === "683466449330765835") { //This will make the bot work only in that channel
    if (message.author.bot) return;
    var command = message.content
      .toLowerCase()
      .slice(prefix.length)
      .split(" ")[0];

    if (command === "test") {
      message.channel.send("Test done, bot's working");
    }

    if (command === "gen") {
      if (generated.has(message.author.id)) {
        message.channel.send(
          " :no_entry:  ** Wait 15 minute before generating another account!. ** - " +
            message.author
        );
      } else {
        let messageArray = message.content.split(" ");
        let args = messageArray.slice(1);
        if (!args[0])
          return message.reply(":bangbang:** Select `/minecraft` `/spotify` `/nordvpn` More Soon ** ");
        var fs = require("fs");
        const filePath = __dirname + "/" + args[0] + ".txt";

        fs.readFile(filePath, function(err, data) {
          if (!err) {
            data = data.toString();
            var position = data.toString().indexOf("\n");
            var firstLine = data.split("\n")[0];
            message.author.send(firstLine);
            if (position != -1) {
              data = data.substr(position + 1);
              fs.writeFile(filePath, data, function(err) {
                const embed = {
                  title: "Account Generated!",
                  description: "Check your dm for the account's information!",
                  color: 8519796,
                  footer: {
                    icon_url:
                      "https://cdn.discordapp.com/icons/611585446387908620/09a8b6a5aeabf4c0fbeedc224b69e6fe.png?size=1024",
                    text: "SnowCodes Server https://discord.gg/MP5ApZ8"
                  },
                  thumbnail: {
                    url:
                      "https://cdn.discordapp.com/icons/611585446387908620/09a8b6a5aeabf4c0fbeedc224b69e6fe.png?size=1024"
                  },
                  author: {
                    name: "Snow Account Generator",
                    icon_url: bot.displayAvatarURL
                  },
                  fields: []
                };
                message.channel.send({ embed });
                generated.add(message.author.id);
                setTimeout(() => {
                  // Removes the user from the set after a minute
                  generated.delete(message.author.id);
                }, 150000);
                if (err) {
                  console.log(err);
                }
              });
            } else {
              message.channel.send(
                ":pleading_face: **Sorry! Accounts Out Of Stock **"
              );
            }
          } else {
            message.channel.send(
              ":warning:** Sorry, that service doesen't exists **"
            );
          }
        });
      }
    }

    if (command === "help") {
      const embed = {
        title: "Snow Account Generator",
        description: "** Select `/gen minecraft` `/gen spotify` `/gen nordvpn` More Soon **",
        color: 8519796,
        timestamp: "2020-02-29T14:16:26.398Z",
        footer: {
          icon_url:
            "https://cdn.discordapp.com/icons/611585446387908620/09a8b6a5aeabf4c0fbeedc224b69e6fe.png?size=1024",
          text: "SnowCodes Server https://discord.gg/MP5ApZ8"
        },
        thumbnail: {
          url:
            "https://cdn.discordapp.com/icons/611585446387908620/09a8b6a5aeabf4c0fbeedc224b69e6fe.png?size=1024"
        },
        author: {
          name: "Account Generator",
          icon_url: bot.displayAvatarURL
        },
        fields: [
          {
            name: "Bot made by",
            value: "SnowCodes Team"
          }
          
        ]
           
      };
      message.channel.send({ embed });
    }
    if (command === "restock") {
      let messageArray = message.content.split(" ");
      let args = messageArray.slice(1);
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.reply("Sorry, you can't do it, you are not an admin!");
      if (!args[0])
        return message.reply(
          "Please, specify the service you want to restock!"
        );
      message.channel.send(
        "@everyone " +
          "**" +
          args[0] +
          "**" +
          " has been restocked by " +
          "<@" +
          message.author.id +
          ">"
      );
    }
  }
});





const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

bot.login("NjgzMzI5MDM1Njc3NTk3NzE3.Xlp9yQ.QuAOyJ8Zs52gPHG_bNUXlkbdbkY");
