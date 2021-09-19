






db.on("ready", function() {
  var intervalCheck = setInterval(function() {
    const currentTime = new Date().getTime();
    const convertTime = new Date(currentTime).toString();
    sql.all("SELECT * FROM muteDatabase").then(function(row) {
      if (row.length == 0) return clearInterval(intervalCheck);
      console.log("Another check has been performed towards the database.");
        for (var i = 0; i < row.length; i++) {
          if (row[i].unmuteDate < currentTime) {
            sql.run(`DELETE FROM muteDatabase WHERE userID = ${row[i].userID}`);
            const role = db.guilds.get(row[i].guildID).roles.find("name", "Hexus-Mute");
            if (!role) return console.log("Cannot find mute role for that guild.");
            const channel = db.guilds.get(row[i].guildID).channels.find("name", "mute-logs") || db.guilds.get(row[i].guildID).channels.find("name", "logs");
            if (!channel) return console.log("Cannot find a log channel in specified users guild.");
            db.guilds.get(row[i].guildID).fetchMember(row[i].userID).then(m => m.removeRole(role.id));
            db.guilds.get(row[i].guildID).channels.get(channel.id).send("", {embed: {
              author: {name: db.user.tag, icon_url: db.user.avatarURL},
              color: 0xff0000,
              title: "Successfully unmuted user!",
              description: `Successfully unmuted: ${row[i].username} : [${row[i].userID}] \nStaff: ${row[i].staffMember} \nReason: ${row[i].reason} \nUnmute date: ${convertTime}`,
              timestamp: new Date(),
              footer: {text: "Command executed!"}
            }});
          }
        }
    }).catch(error => console.error(error));
  }, 5000);
});



const ms = require("ms");
const sql = require("sqlite");
sql.open("./muteDatabase.sqlite");
exports.run = function(bot, msg) {
  sql.all("SELECT * FROM muteDatabase").then(function(row) {
    if (!row) return bot.embed(msg, bot.hex, "Invailid Database Request:", "Nobody is currently muted in the database.");
    var data = [];
    for (var user = 0; user < row.length; user++) {
        const userTime = ms(row[user].unmuteDate);
        const convertedTime = new Date(userTime).toString(); 
        data.push(`Username: ${row[user].username}#${row[user].userID} \nUnmute Date: ${convertedTime} \nReason: ${row[user].reason} \nStaff: ${row[user].staffMember}\n\n`);
    }
    const newData = data.toString().replace(",", "");
    bot.embed(msg, bot.hex, "Successfully fetched muted users:", newData || "No users in the database!");
  });
};

exports.conf = {
  activated: true,
  aliases: [],
  permLevel: 2
};
      
exports.help = {
  name: 'viewmutes',
  description: 'Shows all mutes within the database.',
  usage: 'viewmutes'
};





const sql = require("sqlite");
sql.open("./muteDatabase.sqlite");
const ms = require("ms");
const moment = require("moment");
require("moment-duration-format");
exports.run = function(bot, msg, args) {
  const time = args[1];
  const muteChannel = msg.guild.channels.find("name", bot.settings.muteChannelName).id;
  const user = msg.mentions.users.first() || bot.users.get(args[0]);
  if (!user) return bot.embed(msg, bot.hex, "Invalid user mention:", "Couldn't find mention or ID is invalid.");
  const mute = msg.guild.roles.find("name", bot.settings.muteRole);
  if (!mute) return bot.embed(msg, bot.hex, "Invalid Exception:", "Mute role: `Axel-Mute` doesn't exist.");
  if (!time) return bot.embed(msg, bot.hex, "Invalid Exception:", "Please specify a time for the mute!");
  if (ms(time) <= 0) return bot.embed(msg, bot.hex, "Invalid Exception:", "Please specify a realistic time.");
  if (ms(time) > bot.settings.overflow) return bot.embed(msg, bot.hex, "Invalid Exception:", "Time overflow detected, please provide a realistic time.");
  if (Math.floor(ms(time)) <= 0) return bot.embed(msg, bot.hex, "Invalid Exception:", "Please specify a realistic time.");
  if (!bot.hasNumber(time)) return bot.embed(msg, bot.hex, "Invalid Exception:", "Please specify a time that has a number.");
  const reason = args.slice(2).join(" ");
  if (!reason) return bot.embed(msg, bot.hex, "Invalid Exception:", "Please specify a reason for this mute!");
  const createdTime = new Date().getTime() + ms(time);
  const convertedTime = new Date(createdTime).toString(); 
  const forTime = ms(ms(time), {long: true});

  bot.fetchMember(msg, user).then(function(member) {
    if (!member.roles.has(mute.id)) {
      sql.get(`SELECT * FROM muteDatabase WHERE userID = ${member.id}`).then(function(row) {
        if (!row) {
          sql.run("INSERT INTO muteDatabase (username, userID, guildID, unmuteDate, staffMember, reason) VALUES (?, ?, ?, ?, ?, ?)", 
          [member.user.tag, member.id, msg.guild.id, createdTime, msg.author.tag, reason]); 
          member.addRole(mute.id).then(function(member) {
            bot.embed(msg, bot.hex, "Successfully muted member:", 
            `Muted: ${member.user.tag} : [${member.id}] \nMute Time: ${forTime} \nUnmute Time: ${convertedTime} \nReason: ${reason}`);
            bot.embedID(msg, muteChannel, bot.hex, "Successfully muted member:", 
            `Muted: ${member.user.tag} : [${member.id}] \nMute Time: ${forTime} \nUnmute Time: ${convertedTime} \nReason: ${reason}`);
          });
        } else return bot.embed(msg, bot.hex, "Invalid mute attempt:", "User is in the database but somebody has removed their role, wait for their mute to expire so you can perform another mute");
      }).catch(function(error) {
        bot.embed(msg, bot.hex, "Use command again, had to create table for the database.", `\`\`\`${error.stack}\`\`\``);
        sql.run("CREATE TABLE IF NOT EXISTS muteDatabase (username TEXT, userID TEXT, guildID TEXT, unmuteDate TEXT, staffMember TEXT, reason TEXT)").then(function() {
          sql.run("INSERT INTO muteDatabase (username, userID, guildID, unmuteDate, staffMember, reason) VALUES (?, ?, ?, ?, ?, ?)", 
          [member.user.tag, member.id, msg.guild.id, createdTime, msg.author.tag, reason]);
        });
      });
    } else return bot.embed(msg, bot.hex, "Invalid Exception:", "Mentioned user is already muted.");
  }).catch(error => bot.embed(msg, bot.hex, "Error occured:", "Invalid mute specification, check your arguments for spaces."));

    var intervalCheck = setInterval(function() {
      bot.fetchMember(msg, user).then(function(member) {
        sql.get(`SELECT * FROM muteDatabase WHERE userID = ${member.id}`).then(function(row) {
          if (!row) return clearInterval(intervalCheck);
          const currentTimeInMS = new Date().getTime();
          if (row.unmuteDate < currentTimeInMS) {
            bot.embed(msg, bot.hex, "Successfully unmuted user:", 
            `Unmuted: ${row.username} : [${row.userID}]\nMute Time: ${forTime}\nReason: ${row.reason}`);
            sql.run(`DELETE FROM muteDatabase WHERE userID = ${member.id}`).catch(function(error) {
              bot.embed(msg, bot.hex, "SQL_DATABASE_ERROR:", `\`\`\`${error.stack}\`\`\``);
            });
            clearInterval(intervalCheck);
            member.removeRole(mute.id);
          }
        }).catch(error => console.error(error.stack));
      });
    }, 5000);
};

exports.conf = {
  activated: true,
  aliases: [],
  permLevel: 2
};
    
exports.help = {
  name: 'mute',
  description: 'Bans mentioned user with specified reason.',
  usage: 'mute [mention/id] [time] [reason]'
};
