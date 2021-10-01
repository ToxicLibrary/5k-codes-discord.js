
exports.run = async function(client, channel) {
    if(premium_servers.includes(channel.guild.id)) return;

    var limt2 = sql.query(`SELECT * FROM protect WHERE id = ${channel.guild.id}`)
    if(limt2.length) {
        if(limt2[0].channellimt > 0) { 
        if(!channel.guild.me.hasPermission( 'VIEW_AUDIT_LOG' )) return;
        channel.guild.fetchAuditLogs().then(logs => {
            const ser = logs.entries.first().executor;
            if(ser.id == client.user.id) return;
    
        if(!limt[channel.guild.id]) {
            setInterval( function ( ) {
            limt[channel.guild.id] = { 
                "guild": limt2[0].channellimt,
                "members": { }
            }
            }, 1000 * 60 * 60 * 11)
            limt[channel.guild.id] = { 
                "guild": limt2[0].channellimt,
                "members": { }
            }
            limt[channel.guild.id]["members"][ser.id] = 1;
        } else {
            limt[channel.guild.id]["members"][ser.id]++;
            if( limt[channel.guild.id]["members"][ser.id]>= limt[channel.guild.id]["guild"]) {
    
                channel.guild.members.get(ser.id).roles.forEach(r => {
                    if (r.hasPermission('MANAGE_CHANNELS')) {
                        channel.guild.members.get(ser.id).removeRole(r.id);
    
                    }
                    })
                        }
        }
    })
    }
    }
        
        };
      