var users_data = { };

module.exports = async (client) => {
    setInterval( function ( ) { 
        refreshData()
        }, 1000*10)
        

checkMember = (m, g) => {
    var result = sql.query(`SELECT * FROM profile WHERE id = ${m.id} `);
    if(!result.length) return false;
    return true
}
refreshData = ( ) => {
    Object.keys(users_data).forEach(function (key){
    var member = sql.query(`SELECT * FROM profile WHERE id = ${key} `);
    if(!member.length) return;
    if(member[0].level == users_data[key].level) return;
    if(member[0].xp == users_data[key].xp) return;

    if(member[0].level > users_data[key].level ) {
    sql.query(`UPDATE profile SET level = ${users_data[key].level} WHERE id = ${key}`)
    sql.query(`UPDATE profile SET xp = ${users_data[key].xp} WHERE id = ${key}`)
    } else {
        sql.query(`UPDATE profile SET level = ${parseInt(member[0].level + users_data[key].level)} WHERE id = ${key}`)
        sql.query(`UPDATE profile SET xp = ${parseInt( member[0].xp + users_data[key].xp)} WHERE id = ${key} `)
        if(users_data[key].money == member[0].money) return;
        sql.query(`UPDATE profile SET xp = ${parseInt( member[0].money + users_data[key].money)} WHERE id = ${key}`)
    }
    })
}
upgradeLevel = (guild, member) => {
users_data[member.id].level++;
users_data[member.id].xp = 0;
if(users_data[member.id] > 100000)  {
parseInt(users_data[member.id].money*1.5);
} else {
parseInt(users_data[member.id].money*2);
}

refreshData()
}
check = (guild, member) => {
    if(!users_data[member.id]) { 
      var result = sql.query(`SELECT * FROM profile WHERE id = ${member.id} `);
      if(!checkMember(member, guild)) {
        sql.query(`INSERT INTO profile (id, xp, level, money, rep) VALUES (${member.id}, 0, 1, 5000, 0)`)
        users_data[member.id] = { level: 0, xp: 0, money: 0}
      } else {
        users_data[member.id] = { level: result[0].level, xp: result[0].xp, money: result[0].money};
      }
    }
      }    
}
addXP = (guild, member, xp) => {
        if(!users_data[member.id]) {
            check(guild, member);
        } else { 
    

const curLevel = Math.floor(0.1 * Math.sqrt(users_data[member.id].xp));
if(users_data[member.id].level < curLevel) {
    upgradeLevel(guild, member);
}

users_data[member.id].xp += xp;
        }
    
}
addMoney = (guild, member, credits) => {
        if(!users_data[member.id]) {
            check(guild, member);
        } else { 
    
users_data[member.id].money += credits;
        
    }

}