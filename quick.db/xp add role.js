client.on("message", async (message) => {
  
  let xp = await db.fetch(`xp_${message.author.id}`)
  let nexp = 300
  let ramd = Math.floor(Math.random() * 10)
  let level = await db.fetch(`level_${message.author.id}`)
  if(xp > nexp) level = 2, nexp = nexp + 1000
  if(!level) level = 1
  if(message.length > 2) db.add(`xp_${message.author.id}`, ramd)
  
  if(level == 1) {
    message.member.addRole("628396070132514817")
  }
  if(level == 5) {
    message.member.removeRole("628396070132514817")
    message.member.addRole("628397389014630450")
  }
  if(level == 10) {
    message.member.removeRole("628397389014630450")
    message.member.addRole("628397185242890271")
  }
  if(level == 15) {
    message.member.removeRole("628397185242890271")
    message.member.addRole("628397185154940929")
  }
  if(level == 20) {
    message.member.removeRole("628397185154940929")
    message.member.addRole("628397183946981377")
  }
  if(level == 25) {
    message.member.removeRole("628397183946981377")
    message.member.addRole("628397187348561929")
  }
  if(level == 30) {
    message.member.removeRole("628397187348561929")
    message.member.addRole("628397140217036810")
  }
  if(level == 35) {
    message.member.removeRole("628397140217036810")
    message.member.addRole("628396744513814528")
  }
  if(level == 40) {
    message.member.removeRole("628396744513814528")
    message.member.addRole("628396742622183463")
  }
  if(level == 45) {
    message.member.removeRole("628396742622183463")
    message.member.addRole("628396741728665602")
  }
  if(level == 50) {
    message.member.removeRole("628396741728665602")
    message.member.addRole("628396741422481428")
  }
  if(level == 55) {
    message.member.removeRole("628396741422481428")
    message.member.addRole("628396744165818389")
  }
  if(level == 60) {
    message.member.removeRole("628396744165818389")
    message.member.addRole("628396687043330051")
  }
  if(level == 65) {
    message.member.removeRole("628396687043330051")
    message.member.addRole("628396448387694609")
  }
  if(level == 70) {
    message.member.removeRole("628396448387694609")
    message.member.addRole("628396437989752873")
  }
  if(level == 75) {
    message.member.removeRole("628396437989752873")
    message.member.addRole("628406166191603742")
  }
  if(level == 80) {
    message.member.removeRole("628406166191603742")
    message.member.addRole("628406258629869573")
  }
  if(level == 85) {
    message.member.removeRole("628406258629869573")
    message.member.addRole("628396423968194561")
  }
  if(level == 90) {
    message.member.removeRole("628396423968194561")
    message.member.addRole("628396221702078465")
  }
  if(level == 95) {
    message.member.removeRole("628396221702078465")
    message.member.addRole("628407650329165835")
  }
  if(level > 99) {
    message.member.removeRole("628407650329165835")
    message.member.addRole("628407785670836245")
  }


});
