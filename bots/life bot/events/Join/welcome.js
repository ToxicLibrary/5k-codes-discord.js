var errors = 0;
function getDays(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}
jointoday = JSON.parse(fs.readFileSync('./data/jointoday.json','utf8'));

exports.run = (client, member) => {
if(premium_servers.includes(member.guild.id)) return;
function getInviter() {
  return new Promise(resolve => {
      member.guild.fetchInvites().then((data) => {
          data.forEach((Invite, key, map) => {
              if( Invite.uses != lastinvites[Invite.code] ){
                  lastinvites[Invite.code] = Invite.uses;
                 if(Invite.inviter.id == client.user.id) {
                      resolve( member.guild.members.get(member.guild.ownerID) );
                 } else {
                  resolve( member.guild.members.get(Invite.inviter.id) );
              }
          }
          })
      })
  })
}
var result = sql.query(`SELECT * FROM welcome WHERE guild = ${member.guild.id}`);
if(!result.length) return;
if(parseInt(result[0].role)) {
var role = member.guild.roles.get(result[0].role)
if(!role) return;
member.addRole(role);
}

if(!result[0].chat) return;
if(result[0].active == 0) return;
if(result[0].embed == 1) {

  if( !jointoday[ member.guild.id ] ){
      jointoday[ member.guild.id ] = {};
      jointoday[ member.guild.id ][moment().format("YYYY-MM-DD")]  = 0;
    }
    if(!jointoday[ member.guild.id ][moment().format("YYYY-MM-DD")]) {
            jointoday[ member.guild.id ][moment().format("YYYY-MM-DD")] = 0;
    }
    jointoday[ member.guild.id ][moment().format("YYYY-MM-DD")]++;   
    let embed = new discord.RichEmbed()
        .setThumbnail(member.user.displayAvatarURL)
        .setColor(0x36393f)
        .setAuthor(member.displayName,member.user.displayAvatarURL)
        
        .addField('» مضى على دخولك الديسكورد',getDays(member.user.createdTimestamp,Date.now()) + " يوماً",true)
        .addField('» مضى على دخولك للسيرفر',getDays(member.joinedTimestamp,Date.now()) + " يوماً",true)
        .addField('» رقمك في الدخول اليومي',jointoday[ member.guild.id ][moment().format("YYYY-MM-DD")] ,true)

          async function waitInviter ( ) {
            var inviter = await getInviter();
            embed.addField('» تم دعوتك بواسطة',inviter,true)
            member.guild.channels.get(result[0].chat).send(  { embed }  ).catch(err => errors++);
            var join = sql.query(`SELECT * FROM joins WHERE guild = ${member.guild.id} AND id = ${member.id}`)
            if(!join.length) { 
             sql.query(`INSERT INTO joins (id, guild, inviter) VALUES (${member.id}, ${member.guild.id}, ${inviter.id})`)
            } else {
              sql.query(`UPDATE joins SET inviter = ${inviter.id} WHERE guild = ${member.guild.id} AND id = ${member.id}`)
            }
           
    
            }
            waitInviter( )
              member.guild.channels.get(result[0].chat).send(  { embed }  ).catch(err => errors++);
          

} else {
    if(!result[0].text) return;

var inviter;
    async function waitInviter ( ) {
    inviter = await getInviter();
    var result = sql.query(`SELECT * FROM joins WHERE guild = ${member.guild.id} AND id = ${member.id}`)
    if(!result.length) { 
     sql.query(`INSERT INTO joins (id, guild, inviter) VALUES (${member.id}, ${member.guild.id}, ${inviter.id})`)
    } else {
      sql.query(`UPDATE joins SET inviter = ${inviter.id} WHERE guild = ${member.guild.id} AND id = ${member.id}`)
    }
  }
        waitInviter ( ) 
    member.guild.channels.get(result[0].chat).send(result[0].text.replace('[user]', member).replace('[inviter]', inviter).replace('[server]', member.guild.name)).catch(err => errors++);

}
fs.writeFileSync('./data/jointoday.json',JSON.stringify(jointoday));

};
