client.on('message', function(message) {
    if(!message.channel.guild) return;
if(message.content ===  'f!color 140') {
if(message.member.hasPermission('MANAGE_ROLES')) {
setInterval(function(){})
message.channel.send('جاري عمل الالوان |✅')
}else{
message.channel.send('ما معاك البرمشن المطلوب  |❌')
}
}
});

client.on('message', message=>{
if (message.content ===  'f!color 140'){
if(!message.channel.guild) return;
if (message.member.hasPermission('MANAGE_ROLES')){
  setInterval(function(){})
    let count = 0;
    let ecount = 0;
for(let x = 1; x < 141; x++){
message.guild.createRole({name:x,
color: 'RANDOM'})
}
}
}
});