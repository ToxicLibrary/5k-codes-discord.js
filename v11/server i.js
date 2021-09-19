var moment = require("moment");
client.on("message", message => {
	if(message.content.startsWith(prefix + "server")){
		if(message.author.bot || message.channel.type == "dm") return;
		let onlineM = message.guild.members.filter(m => m.presence.status !== "offline");
		let verifyL = ["None", "Low", "Medium", "Hard", "Extreme"];
		let region = {
			'brazil': "`Brazil`",
			'eu-central': "`Central Europe`",
			'singapore': "`Singapore`",
			'us-central': "`US Central`",
			'sydney': "`Sydney`",
			'us-east': "`US East`",
			'us-south': "`US South`",
			'us-west': "`US West`",
			'eu-west': "`Western Europe`",
			'london': "`London`",
			'amsterdam': "`Amsterdam`",
			'hongkong': "`Hong Kong`",
			'russia': "`Russia`"
		};
		let serverEmbed = new Discord.RichEmbed()
		.setColor("#36393e")
		.setThumbnail(message.guild.iconURL)
		.setAuthor(`${message.guild.name}, Server Info`)
		.setDescription(`- Server Name \`${message.guild.name}\`\n- Created At \`${moment(message.guild.createdAt).format('D/MM/YYYY h:mm a')}\`\n- Total Members \`${message.guild.memberCount} [Online: ${onlineM.size}]\`\n- Server Owner \`${message.guild.owner.user.tag}\`\n- Channels \`${message.guild.channels.filter(m => m.type == 'text').size} Text || ${message.guild.channels.filter(m => m.type == 'voice').size} Voice\`\n- Categories \`${message.guild.channels.filter(m => m.type == 'category').size}\`\n- Roles \`${message.guild.roles.size}\`\n- Region \`${region[message.guild.region]}\`\n- Verification Level \`${verifyL[message.guild.verificationLevel]}\`\n- Server ID \`${message.guild.id}\``)
		.setFooter(message.client.user.username,message.client.user.avatarURL);
	if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`:no_entry: You dont have permission!`).then(mm => mm.delete(5000));	message.channel.send(serverEmbed).catch(console.error);
	} else if(message.content.startsWith(prefix + "user")){
		if(message.author.bot || message.channel.type == "dm") return;
		let mnt = message.mentions.users.first();
		let user = mnt || message.author;
		let userEmbed = new Discord.RichEmbed()
		.setColor("#36393e")
		.setThumbnail(user.avatarURL)
		.setAuthor(`${user.username}, User Info`)
		.setDescription(`- Name \`${user.tag}\`\n- Created At \`${moment(user.createdAt).format('D/MM/YYYY h:mm a')}\`\n- Joined At \`${moment(user.joinedAt).format('D/MM/YYYY h:mm a')}\`\n- ID \`${user.id}\``)
		.setFooter(message.client.user.username,message.client.user.avatarURL);
		message.channel.send(userEmbed).catch(console.error);
		
	}
});