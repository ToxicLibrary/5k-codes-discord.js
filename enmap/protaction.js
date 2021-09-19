const Discord = require("discord.js");
const client = new Discord.Client();
const Enmap = require("enmap");
const delay = require("delay");
const ms = require("ms");
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
const config = new Enmap({name: "config"});
const prefix = "$";

function exists(value){
  if(config.get(value) === undefined){
    return false
  }
  else{
    return true;
  }
}
async function hacking(userid,guildid, reason){
  let guild = await client.guilds.get(guildid);
  let user = await guild.members.get(userid);
  if(user.bannable){
    guild.owner.send(`<@!${user.id}> tried to hack your server!\nReason: ${reason}`);
    user.ban({reason: `trying to hack\n${reason}`});
  }else{
    guild.owner.send(`<@!${user.id}> tried to hack your server and i couldn't ban him, i'm trying to remove his roles!\nReason: ${reason}\n`);
    let roles = [];
    user.roles.forEach(async r=>{
      if(r.position >= guild.me.highestRole) return;
      roles.push(r);
    });
    user.removeRoles(roles,`trying to hack\n${reason}`);
  };
};
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  if(exists("config_channelDelete_delay") === false) config.set("config_channelDelete_delay", ms("30 seconds"));
  if(exists("config_ban_delay") === false) config.set("config_ban_delay", ms("30 seconds"));
  if(exists("config_kick_delay") === false) config.set("config_kick_delay", ms("30 seconds"));
  if(exists("config_roleDelete_delay") === false) config.set("config_roleDelete_delay", ms("30 seconds"));
  if(exists("config_channelDelete_limit") === false) config.set("config_channelDelete_limit", 3);
  if(exists("config_ban_limit") === false) config.set("config_ban_limit", 3);
  if(exists("config_kick_limit") === false) config.set("config_kick_limit", 3);
  if(exists("config_roleDelete_limit") === false) config.set("config_roleDelete_limit", 3);
});

client.on("channelDelete", async channel=>{
  let g = channel.guild;
  await delay(500);
  g.fetchAuditLogs({type: "CHANNEL_DELETE"}).then(logs=>{
    let id = `${logs.entries.first().executor.id}`;
    if(data[id] === undefined){
      data[id] = {
        channel: 0,
        role: 0,
        kick: 0,
        ban: 0,
      };
      fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
    };
    let limit = 0;
    let dataid = data[id];
    console.log(config.get("config_channelDelete_limit"));
    if(dataid === 0){
      limit = 1;
      dataid.channel = limit;
      fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
      setTimeout(()=>{
        if(dataid.channel === limit){
          dataid.channel = 0;
          fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
        };
      }, config.get("config_channelDelete_delay"));
    }else if(dataid.channel <= config.get("config_channelDelete_limit")){
      dataid.channel++;
      fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
      setTimeout(()=>{
        if(dataid.channel === limit){
          dataid.channel = 0;
          fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
        }
      }, config.get("config_channelDelete_delay"));
    }else{
      dataid.channel = 0
      fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
      hacking(id, g.id, `deleted more than ${config.get("config_channelDelete_limit")} channel in ${config.get("config_channelDelete_delay") / 1000} seconds!`);
    };
  })
});

client.on("roleDelete", async role=>{
  let g = role.guild;
  await delay(500);
  let logs = await g.fetchAuditLogs({type: "ROLE_DELETE"});
  let id = `${logs.entries.first().executor.id}`;
  if(data[id] === undefined){
    data[id] = {
      channel: 0,
      role: 0,
      kick: 0,
      ban: 0,
    };
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
  };
  let limit = 0;
  let dataid = data[id];
  if(dataid.role === 0){
    dataid.role++;
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
    setTimeout(()=>{
      if(dataid.role === limit){
        dataid.role = 0;
        fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
        return;
      };
    }, config.get("config_roleDelete_delay"));
  }else if(dataid.role <= config.get("config_roleDelete_limit")){
    dataid.role++;
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
    setTimeout(()=>{
      if(dataid.role === limit){
        dataid.role = 0;
        fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
        return;
      };
    }, config.get("config_roleDelete_delay"));
  }else{
    dataid.role = 0;
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
    hacking(`${id}`, g.id, `deleted more than ${config.get("config_roleDelete_limit")} role in ${config.get("config_roleDelete_delay") / 1000} seconds!`);
  };
});

client.on("guildMemberRemove", async member=>{
  let g = member.guild;
  await delay(500);
  let kickLogs = await g.fetchAuditLogs({type: "MEMBER_KICK"});
  let id = kick`${kickLogs.entries.first().executor.id}`;
  if(data[id] === undefined){
    data[id] = {
      channel: 0,
      role: 0,
      kick: 0,
      ban: 0,
    };
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
  };
  let limit = 0;
  let dataid = data[id];
  if(limit === 0){
    dataid.kick++;
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
    setTimeout(()=>{
      if(dataid.kick === limit){
        dataid.kick = 0;
        fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
        return;
      };
    }, config.get("config_kick_delay"));
  }else if(dataid.kick <= config.get("config_kick_limit")){
    dataid.kick++;
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
    setTimeout(()=>{
      if(dataid.kick === limit){
        dataid.kick = 0;
        fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
        return;
      };
    }, config.get("config_kick_delay"));
  }else{
    dataid.kick = 0;
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
    hacking(id, g.id, `kicked more than ${config.get("config_kick_limit")} member in ${config.get("config_kick_delay") / 1000} seconds!`);
  };

});

client.on("guildBanAdd", async (g, member)=>{
  let banlogs = await g.fetchAuditLogs({type: "MEMBER_BAN_ADD"});
  let id = `${banlogs.entries.first().executor.id}`;
  if(data[id] === undefined){
    data[id] = {
      channel: 0,
      role: 0,
      kick: 0,
      ban: 0,
    };
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
  };
  let limit = 0;
  let dataid = data[id];
  if(dataid.ban === 0){
    dataid.ban++;
    fs.writeFileSync("./data.json", JSON.stringify(data, null,4));
    setTimeout(()=>{
      if(dataid.ban === limit){
        dataid.ban = 0;
        fs.writeFileSync("./data.json", JSON.stringify(data, null,4));
        return;
      }
    }, config.get("config_ban_delay"));
  }else if(dataid.ban <= config.get("config_ban_limit")){
    dataid.ban++;
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
    setTimeout(()=>{
      if(dataid.ban === limit){
        dataid.ban = 0;
        fs.writeFileSync("./data.json", JSON.stringify(data, null,4));
        return;
      }
    }, config.get("config_ban_delay"));
  }else{
    dataid.ban = 0;
    fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
    hacking(id, g.id, `banned more than ${config.get("config_ban_limit")} member in ${config.get("config_ban_delay") / 1000} seconds!`);
  };
})

client.on("message", msg=>{
  if(!msg.content.startsWith(prefix)) return;
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply("لا يمكنك استعمال الامر!")
  if(cmd === "settings"){
    let [setting, dOrL, value, ...rest] = args;
    if(setting === "kick"){
      if(dOrL === "limit"){
        if(typeof parseInt(value) !== "number") return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**\nvalue should be a number!`);
        if(parseInt(value) < 1) return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**\nvalue should be more than 1!`);
        config.set("config_kick_limit", parseInt(value,10));
        msg.reply("done!");
      }else if(dOrL === "delay"){
        if(typeof parseInt(value) !== "number") return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**\nvalue should be a number of seconds!`);
        config.set("config_kick_delay", ms(`${value} seconds`));
        msg.reply("done!");
      }else return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**`);
    }else if(setting === "ban"){
      if(dOrL === "limit"){
        if(typeof parseInt(value) !== "number") return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**\nvalue should be a number!`);
        if(parseInt(value) < 1) return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**\nvalue should be more than 1!`);
        config.set("config_ban_limit", parseInt(value,10));
        msg.reply("done!");
      }else if(dOrL === "delay"){
        if(typeof parseInt(value) !== "number") return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**\nvalue should be a number of seconds!`);
        config.set("config_ban_delay", ms(`${value} seconds`))
        msg.reply("done!");
      }else return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**`);
    }else if(setting === "channel"){
      if(dOrL === "limit"){
        if(typeof parseInt(value) !== "number") return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**\nvalue should be a number!`);
        if(parseInt(value) < 1) return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**\nvalue should be more than 1!`);
        config.set("config_channelDelete_limit", parseInt(value,10))
        msg.reply("done!");
      }else if(dOrL === "delay"){
        if(typeof parseInt(value) !== "number") return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**\nvalue should be a number of seconds!`);
        config.set("config_channelDelete_delay", ms(`${value} seconds`))
        msg.reply("done!");
      }else return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**`);
    }else if(setting === "role"){
      if(dOrL === "limit"){
        if(typeof parseInt(value) !== "number") return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**\nvalue should be a number!`);
        if(parseInt(value) < 1) return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**\nvalue should be more than 1!`);
        config.set("config_roleDelete_limit", parseInt(value,10))
        msg.reply("done!");
      }else if(dOrL === "delay"){
        if(typeof parseInt(value) !== "number") return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**\nvalue should be a number of seconds!`);
        config.set("config_roleDelete_delay", ms(`${value} seconds`))
        msg.reply("done!");
      }else return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**`);
    }else return msg.reply(`**${prefix}settings [kick,ban,channel,role] [limit,delay] [value]**`);
  }
});

client.login('token');
