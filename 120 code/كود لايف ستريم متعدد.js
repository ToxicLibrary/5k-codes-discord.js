client.on('ready', function(){//npm i ms 
    var ms = 60000 ;
    var setGame = [`1`,'2','3','4',`5`];
    var i = -1;
    var j = 0;
    setInterval(function (){
        if( i == -1 ){
            j = 1;
        }
        if( i == (setGame.length)-1 ){
            j = -1;
        }
        i = i+j;
        client.user.setGame(setGame[i],`http://www.twitch.tv/v5bz`);
    }, ms);

});