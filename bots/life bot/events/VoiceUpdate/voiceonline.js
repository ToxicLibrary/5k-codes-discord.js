
exports.run = (client, oldMember, newMember	) => {
    var voices = sql.query(`SELECT * FROM voiceonline  WHERE voiceguild = ${oldMember.guild.id}`);
    if(!voices.length) return;
    if(voices[0].voiceon == 0) return;
    var channel = client.channels.get(voices[0].voiceid);
if(!channel) return;

var count = 0;
    if(voices[0].voicebots) {
    oldMember.guild.channels.filter(c=>c.type=='voice').forEach( ( c ) => {
      
      count += c.members.filter(m => m.user.bot !== true).size;
    });
  } else {
    oldMember.guild.channels.filter(c=>c.type=='voice').forEach( ( c ) => {
      
      count += c.members.size;
    });
  }
channel.edit({ name: voices[0].voicename.replace('[00]', count) })
};
    