
function getDays(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}
var text = "";
var text2 = "";

async function openFile( guildid ) {
    fs.readdir(`./logs/${guildid}`, (err, data) => {
        if (err) {
            fs.mkdirSync(`./logs/${guildid}`);
            fs.writeFileSync(`./logs/${guildid}/clear.txt`, '' )  
            return '';
        }  else { 
            fs.readFile(`./logs/${guildid}/clear.txt`, 'utf8', function(err, data) {
                if (err) throw err;
text = data;
              });
                    } 
    });

}
var errors = 0;

exports.run = async (client, message, args, cmd) => {

    if(cmd == "clear") {
        await openFile(message.guild.id);
        var count = message.channel.messages.size;
        if(args[0]) {
            if(args[0] == 100) {
                count = parseInt(args[0]);
            } else { 
                if(args[0] > 100) {
                    count = 100;
                } else { 
            count = parseInt(args[0])+1;
                }             
        }
        }
            message.channel.fetchMessages({ limit: count })
        .then(m => {
            m.forEach(mm => {
                if(getDays(mm.createdTimestamp, Date.now()) > 14) return;
        var date = new Date(mm.createdTimestamp);
var new2 = `[${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] ${message.guild.members.get(mm.author.id).displayName} : ${mm.content} \n`;
        text2 += new2;



    })
        })

        message.channel.bulkDelete(count ).then(v => {
            text += text2;
            fs.writeFileSync(`./logs/${message.guild.id}/clear.txt`,text);

            message.channel.send(
                "```javascript\n " + parseInt(count-1) + " messages have been deleted. ```").then(m => m.delete(2500))
        }).catch(() => {
            errors++;
        });
  
    }

   }
   
   
   
   exports.settings = {
       "name": "clear",
       "sub-names": [ ],
       "server": false,
       "premium": false,
       "owneronly": false,
       "permissions": [ "MANAGE_MESSAGES" ],
       "perMsg": "",
       "description": "لـ مسح المحادثات ",
       "group": 1
   }  