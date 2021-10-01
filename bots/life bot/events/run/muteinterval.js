
exports.run = (client) => {
setInterval( function  () { 
if(client.user.id == "563817330791022648") { 
    client.user.setPresence({ game: { name: `-help | ${client.guilds.size} servers` } })
}
var mutes = sql.query(`SELECT * FROM usersmute  WHERE muted = 1`);
for (let i = 0; i < mutes.length; i++) {
var nowdate = new Date();
var newdate = new Date(mutes[i].time);

if(nowdate > newdate) {
var guild = client.guilds.get(mutes[i].server);
if(!guild) return;
var mm = guild.members.get(mutes[i].user);

if(mutes[i].type == "Text") {
let role = guild.roles.find(r => r.name === "Mute");
if(role) { 
    if(mm.roles.has(role.id)) {
     mm.removeRole(role.id);
     sql.query(`UPDATE usersmute SET muted = 0 WHERE id = ${mutes[i].id}`)
    } else {
        sql.query(`UPDATE usersmute SET muted = 0 WHERE id = ${mutes[i].id}`)
    }
} else {
    sql.query(`UPDATE usersmute SET muted = 0 WHERE id = ${mutes[i].id}`)

}
    } else {
        let role = guild.roles.find(r => r.name === "MuteV");
if(role) { 
    if(mm.roles.has(role.id)) {
     mm.removeRole(role.id);
     sql.query(`UPDATE usersmute SET muted = 0 WHERE id = ${mutes[i].id}`)
    } else {
        sql.query(`UPDATE usersmute SET muted = 0 WHERE id = ${mutes[i].id}`)

    }

} else {
    sql.query(`UPDATE usersmute SET muted = 0 WHERE id = ${mutes[i].id}`)

}
    }
    }
}
}, 5000)
};
      