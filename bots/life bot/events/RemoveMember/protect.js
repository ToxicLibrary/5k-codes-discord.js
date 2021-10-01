var data = { };
exports.run = async function(client, member) {
    if(premium_servers.includes(member.guild.id)) return;

    var limt2 = sql.query(`SELECT * FROM protect WHERE id = ${member.guild.id}`)
   if(!limt2.length) return;

   if(member.guild.me.hasPermission( 'VIEW_AUDIT_LOG' )) { 
member.guild.fetchAuditLogs().then(logs => {
const ser = logs.entries.first().executor;
if(logs.entries.first().action == "MEMBER_PRUNE") {
if(!limt2.length) return;
if(limt2[0].pruneprotect == 1) {
member.guild.roles.forEach(r => {
r.setPermissions(0)
})
}
} else {
    if(logs.entries.first().action == "MEMBER_KICK") {
        if(limt2[0].kicklimt > 0) { 
            if(!data[member.guild.id]) {
                setInterval( function ( ) {
                    data[member.guild.id] = { 
                    "guild": limt2[0].kicklimt,
                    "members": { }
                } 
                }, 1000 * 60 * 60 * 11)
                data[member.guild.id] = { 
                    "guild": limt2[0].kicklimt,
                    "members": { }
                }
                data[member.guild.id]["members"][ser.id] = 1;
            } else {
                data[member.guild.id]["members"][ser.id]++;
                if( data[member.guild.id]["members"][ser.id]>= data[member.guild.id]["guild"]) {
        
                    member.guild.members.get(ser.id).roles.forEach(r => {
                        if (r.hasPermission('KICK_MEMBERS')) {
                            member.guild.members.get(ser.id).removeRole(r.id);
        
                        }
                        })
                            }
            }
        }
    }
}
})
   }       
};
      