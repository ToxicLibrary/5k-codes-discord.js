exports.run = async (client, message, args) => {
if(args[0] == "e") {  
reload(args[0], "event")
message.channel.send(`:mag:  - **${args[0]} event reloading ... :walking: **`).then ( m => {
    setTimeout(function ( ) { 
m.delete()
    },3000)
})
} else {
    reload(args[0])
    message.channel.send(`:mag:  - **${args[0]} command reloading ... :walking: **`).then ( m => {
        setTimeout(function ( ) { 
    m.delete()
        },3000)
    })   
}
}
    
    
    
    exports.settings = {
        "name": "reload",
        "sub-names": ["re", "rr"],
        "server": false,
        "owneronly": true,
        "premium": false,
        "permissions": [  ],
        "perMsg": "",
        "description": "لـ تحديث الاوامر او الايفنتات",
        "group": 3
    }  