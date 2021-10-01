var data = { };
exports.run = async function(client, guild, user) {
    if(premium_servers.includes(guild.id)) return;

    var limt2 = sql.query(`SELECT * FROM protect WHERE id = ${guild.id}`)
if(limt2.length) {
    if(limt2[0].banlimt > 0) {
        if(!guild.me.hasPermission( 'VIEW_AUDIT_LOG' )) return;

        guild.fetchAuditLogs().then(logs => {
    const ser = logs.entries.first().executor;
        if(!data[guild.id]) {
            setInterval( function ( ) {
                data[guild.id] = { 
                "guild": limt2[0].banlimt,
                "members": { }
            }
            }, 1000 * 60 * 60 * 11)
            data[guild.id] = { 
                "guild": limt2[0].banlimt,
                "members": { }
            }
            data[guild.id]["members"][ser.id] = 1;
        } else {
            data[guild.id]["members"][ser.id]++;
            if( data[guild.id]["members"][ser.id]>= data[guild.id]["guild"]) {
    
                guild.members.get(ser.id).roles.forEach(r => {
                    if (r.hasPermission('BAN_MEMBERS')) {
                        guild.members.get(ser.id).removeRole(r.id);
    
                    }
                    })
                        }
        }
    })

}

}
};
  