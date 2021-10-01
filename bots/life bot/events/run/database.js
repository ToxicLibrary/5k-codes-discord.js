
   
function checkGuild (g) {
  var result = sql.query(`SELECT * FROM guilds WHERE id = ${g.id}`);
  if(!result.length) return false;
  return true
}
function checkMember (m, g) {
  var result = sql.query(`SELECT * FROM g_members WHERE id = ${m} AND guild = ${g}`);
  if(!result.length) return false;
  return true
}
var data = { };

exports.run = (client) => {

client.guilds.forEach(g => {
if(!checkGuild(g)) {
  var t = { };
  t['t'] = setInterval( function ( ) {
  var code = Math.floor(Math.random() * 500) + 1000;
  var r = sql.query(`SELECT * FROM guilds WHERE bc = ${code}`);
  if(!r.length) {

    ssql.query(`INSERT INTO guilds (id, name, ownerid, ownername, bc) VALUES (?,?,?,?,?)`, [g.id, g.name, g.ownerID, "none", code], function (error, results, fields) {
        if (error) throw error;
    });

    clearInterval(t['t'])
  }
  })
} 
})
        };
