function checkid ( id ) {
var result = sql.query(`SELECT * FROM premium WHERE id = ${id}`)
if(result[0]) {
    return "id";
} else {
    var result2 = sql.query(`SELECT * FROM premium WHERE botid = ${id}`)
    if(result2[0]) {
        return "botid";
    } else {
        var result3 = sql.query(`SELECT * FROM premium WHERE guild = ${id}`)
        if(result3[0]) {
            return "guild";
        } else {
        }
    }
    
    
}
}

exports.run = async (client, message, args) => {
    var id = args[0];
    var enddate = args[1];
var date = new Date();
if(enddate.endsWith('d')) {
  date.setDate(date.getDay() + parseInt(args[1]))
  ssql.query(`UPDATE premium SET enddate = ? WHERE ${checkid(id)} = ?`, [date, id], function (error, results, fields) {
      if (error) throw error;
message.reply('تم التجديد بنجاح..')
    });

}
if(enddate.endsWith('m')) {
date.setMonth(date.getMonth() + parseInt(args[1]))
ssql.query(`UPDATE premium SET enddate = ? WHERE ${checkid(id)} = ?`, [date, id], function (error, results, fields) {
    if (error) throw error;
    message.reply('تم التجديد بنجاح..')
});
}
if(enddate.endsWith('y')) {
  date.setFullYear(date.getFullYear() + parseInt(args[1]))
  ssql.query(`UPDATE premium SET enddate = ? WHERE ${checkid(id)} = ?`, [date, id], function (error, results, fields) {
    if (error) throw error;
    message.reply('تم التجديد بنجاح..')
});
  }

  }
      
      
      
      exports.settings = {
          "name": "renew",
          "sub-names": [],
          "server": false,
          "owneronly": true,
          "premium": false,
          "permissions": [  ],
          "perMsg": "",
          "description": "لـ تجديد البرميوم",
          "group": 3
      }  