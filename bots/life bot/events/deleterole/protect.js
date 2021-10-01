var limt = { };

exports.run = async function(client, role) {
    if(premium_servers.includes(role.guild.id)) return;

    var limt2 = sql.query(`SELECT * FROM protect WHERE id = ${role.guild.id}`)
    if(!limt2.length)  return;
        if(limt2[0].rolelimt > 0) { 
            role.guild.fetchAuditLogs().then(logs => {
                const ser = logs.entries.first().executor;
            if(!role.guild.me.hasPermission( 'VIEW_AUDIT_LOG' )) return;
            if(!limt[role.guild.id]) {
                setInterval( function ( ) {
                limt[role.guild.id] = { 
                    "guild": limt2[0].rolelimt,
                    "members": {},
                }
                }, 1000 * 60 * 60 * 11)
                limt[role.guild.id] = { 
                    "guild": limt2[0].rolelimt,
                    "members": {},
                }
    
                limt[role.guild.id]["members"][ser.id] = 1;
            } else {
                limt[role.guild.id]["members"][ser.id]++;
                if(limt[role.guild.id]["members"][ser.id] >= limt[role.guild.id]["guild"]) {
            
                        role.guild.members.get(ser.id).roles.forEach(r => {
                        if (r.hasPermission('MANAGE_ROLES')) {
                            role.guild.members.get(ser.id).removeRole(r.id);
        
                        }
                        })
                        
                }
                        
                        }
                    })
        }
    
        
        };
      