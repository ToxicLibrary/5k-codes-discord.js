
    

exports.run = async (client, message, args) => {

message.author.send(`رابط دعوة البوت : \n
 https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=108526662`)

}
    
          
          
          
          exports.settings = {
              "name": "invite",
              "sub-names": [],
              "server": false,
              "owneronly": false,
              "premium": false,
              "permissions": [  ],
              "perMsg": "",
              "description": "لــ دعوة البوت",
              "group": 4
          }  