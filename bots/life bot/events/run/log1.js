
exports.run = (client) => {
    console.log(client.user.username)
		client.guilds.forEach( ( guild ) => {
				if( guild.me.hasPermission( 'MANAGE_GUILD' ) ) {
					guild.fetchInvites().then((data) => {
						data.forEach((Invite, key, map) => {
							var Inv = Invite.code;
							lastinvites[Inv] = Invite.uses;
						})
					})
				}
		});
};
      