// hosting

var express = require('express')
var app = express()
var discord = require('discord.js')
var client = new discord.Client()
// style 
var ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('assets'))

// post & get 

request = require('request')
 fetch = require('node-fetch');
 bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// sessions
 session  = require('express-session')
 FileStore = require('session-file-store')(session);

app.use(session({
    store: new FileStore({
        ttl: 2592000
    }),
    secret: 'max',
    resave: true,
    saveUninitialized: true
}))


// simple data 
var config = require('./config/website.js');

client.login(config.bot.token)
// coding > starter website
app.get('/test', function (req,res) {
    request({
        url:'https://discordapp.com/api/v7/users/@me/guilds',
        method:'GET',
        headers:{"Authorization": "Bearer " + req.session.token }
    },function (err, result, meta) {
        if( result != undefined ) {
var result = JSON.parse(result.body);
var names = [ ];
Object.keys(result).forEach(function(key) {
var perm = new discord.Permissions(result[key].permissions).toArray()
if(perm.includes('MANAGE_GUILD') || result[key].owner) {
    let guild = client.guilds.get(result[key].id)
	if (!guild) {
result[key]['on'] = false;
names.push(result[key])
    } else {
        result[key]['on'] = true;
        names.push(result[key])

    }
}
})
setTimeout( function ( ) { 
res.send(names)
}, 5000)

}
    })
})
app.get('/', function (req, res) {
    if( req.session.token == undefined ) {
    res.render('index')
    } else {
        request({
            url:'https://discordapp.com/api/v7/users/@me/guilds',
            method:'GET',
            headers:{"Authorization": "Bearer " + req.session.token }
        },function (err, result, meta) {
            if( result != undefined ) {
var result = JSON.parse(result.body);
request({
    url:'https://discordapp.com/api/v7/users/@me',
    method:'GET',
    headers:{"Authorization": "Bearer " + req.session.token }
},function (err, result2, meta) {
    if( result2 != undefined ) {
var result2 = JSON.parse(result2.body);
    res.render('servers', {username: result2['username'], id: result2['id'], avatar: result2['avatar'], guilds: result, discord:discord })
    }
})
            }            
})
}
})

app.get('/logout', function( req, res ) {
	if( req.session.token == undefined ) {
		res.redirect('/')
	} else {
		req.session.token = undefined;
	res.redirect('/')
	}
})

app.get('/auth', function(req, res) {
	if( req.session.token == undefined ) {
	res.redirect(config.bot.redirecturl)
	} else {
res.redirect('/')
	}
} );




app.get('/authorize', function(req,res) {
    if( req.session.token == undefined ) {
                if( req.query.code ){
    				request({
                        url:'https://discordapp.com/api/oauth2/token',
                        method:'POST',
                        headers:{"Content-Type": "application/x-www-form-urlencoded"},
                        form:{
                             'client_id': config.bot.id,
                             'client_secret': config.bot.secret,
                             'grant_type': 'authorization_code',
                             'redirect_uri': config.bot.url,
                             'code': req.query.code
                        }
                    }, function (err, result, meta) {
                        if( result != undefined ) {
                            var result = JSON.parse(result.body);
                            if( result['access_token'] != undefined ) {
                                req.session.token = result['access_token'];
                                setTimeout ( function () {
                                    req.session.token = undefined;
                                }, result['expires_in'] * 1000 );
                            }
                            res.redirect('/');
                        }
                    });
                                    }
            }
})

// hosting 
app.listen(5050, console.log('Website is ready.'))