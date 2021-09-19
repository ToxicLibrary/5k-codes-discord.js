client.on('message', function(message) {
    if(!message.channel.guild) return;
    if(message.content === 'cc') {
    if(message.member.hasPermission('MANAGE_ROLES')) {
    setInterval(function(){})
    message.channel.send('يتم انشاء 50 لون انتضر | ▶️')
    }else{
    message.channel.send('ما معاك البرمشن المطلوب |❌🚫')
    }
    }
    });
    
    client.on('message', message=>{
    if (message.content === 'cc'){
    if(!message.channel.guild) return;
    if (message.member.hasPermission('MANAGE_ROLES')){
    setInterval(function(){})
    let count = 0;
    let ecount = 0;
    for(let x = 1; x < 50; x++){
    message.guild.createRole({name:x,
    color: 'RANDOM'})
    }
    }
    }
    });