    exports.run = async (client, message) => {
 const msg = await message.channel.send("Ping - ms");
  msg.edit(`Pong - ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
}



exports.settings = {
    "name": "ping",
    "sub-names": [ ],
    "server": false,
    "premium": false,
    "owneronly": false,
    "permissions": [  ],
    "perMsg": "",
    "description": "لـ عرض سرعة اتصال البوت ",
    "group": 2
}  