// Has been made by: -  Noah#8011 (ID: 522436878297858049)

var discord = require("discord.js")
, client = new discord.Client()
, colors=require('./colors.json')
, status=true;

client.on('ready', ()=>{
   console.log(`I'm ready!!`);
   
   // code ::
   let guild=client.guilds.get('540758186089512963');
   if(status)
      for(let i=0;i<colors.length;i++) guild.createRole({name:i+1,color:colors[i]});
   else
      for(let i=0;i<colors.length;){
         let role=guild.roles.find('name',(i+1));
         if(role) role.delete();
      }
   
   // :: oode
});

client.login('token');