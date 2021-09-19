
bot.on('message', async msg => {


        if (!msg.content.startsWith(config.music)) return undefined;
        const args = msg.content.split(' ');
        const searchString = args.slice(1).join(' ');
        var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
        const serverQueue = queue.get(msg.guild.id);
        let command = msg.content.toLowerCase().split(' ')[0];
        command = command.slice(config.music.length)
        if (command === 'play') {
            const voiceChannel = msg.member.voiceChannel;
            if (!voiceChannel) return msg.channel.send('<:dnd:540196934649118730> Vous devez vous trouvez dans un canal vocal pour lancer une musique');
            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                const playlist = await youtube.getPlaylist(url);
                const videos = await playlist.getVideos();
                for (const video of Object.values(videos)) {
                    const video2 = await youtube.getVideoByID(video.id);
                    await handleVideo(video2, msg, voiceChannel, true);
                }
                return msg.channel.send(`✅ Playlist: **${playlist.title}** a été ajouter a la file d'attente`);
            } else {
                try {
                    var video = await youtube.getVideo(url);
                } catch (error) {
                    try {
                        var videos = await youtube.searchVideos(searchString, 10);
                        let index = 0;
                        msg.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Veuillez fournir une valeur pour sélectionner l'un des 🔎 résultats allant de 1-10.
					`);
                        try {
                            var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                                maxMatches: 1,
                                time: 10000,
                                errors: ['time']
                            });
                        } catch (err) {
                            console.error(err);
                            return msg.channel.send('<:off:530323938539208714> Sélection invalide');
                        }
                        const videoIndex = parseInt(response.first().content);
                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send('🆘 Aucun résultat pour votre recherche');
                    }
                }
                return handleVideo(video, msg, voiceChannel);
            }
        }
        if (command === 'fav') {
            var url = favsong[args[1]] ? favsong[args[1]].replace(/<(.+)>/g, '$1') : '';
            console.log(favsong[args[1]]);
            console.log(" ")
            const voiceChannel = msg.member.voiceChannel;
            if (!voiceChannel) return msg.channel.send('<:dnd:540196934649118730> Vous devez vous trouvez dans un canal vocal pour lancer une musique');
            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                const playlist = await youtube.getPlaylist(url);
                const videos = await playlist.getVideos();
                for (const video of Object.values(videos)) {
                    const video2 = await youtube.getVideoByID(video.id);
                    await handleVideo(video2, msg, voiceChannel, true);
                }
                return msg.channel.send(`✅ Playlist: **${playlist.title}** a été ajouter a la file d'attente`);
            } else {
                try {
                    var video = await youtube.getVideo(url);
                } catch (error) {
                    try {
                        msg.channel.send(`__**Musique sélectionner:**__\nSélectionner le numéro d'une musique 1-10` + favsong.length + "\nSongs");
                        var songarnum = 1;
                        while (songarnum < favsong.length) {
                            msg.channel.send(songarnum + ". " + favsong[songarnum])
                            songarnum++
                        }
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send('🆘 Aucun résultat pour votre recherche');
                    }
                }
                return handleVideo(video, msg, voiceChannel);
            }
        } else if (command === 'skip') {
            if (!msg.member.voiceChannel) return msg.channel.send('<:dnd:540196934649118730> Vous devez vous trouvez dans un cana vocal');
            if (!serverQueue) return msg.channel.send('Aucune musique lancer... Je ne peut pas sauter de musique');
            serverQueue.connection.dispatcher.end('Vous avez sauter une musique');
            return undefined;
        } else if (command === 'stop') {
            if (!msg.member.voiceChannel) return msg.channel.send('<:dnd:540196934649118730> Vous devez vous trouvez dans un cana vocal');
            if (!serverQueue) return msg.channel.send('Aucune musique lancer... Je ne peut pas stopper une musique');
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end("Vous venez d'arrêter la musique");
            return undefined;
        } else if (command === 'volume' || command === 'vol') {
            if (!msg.member.voiceChannel) return msg.channel.send('<:dnd:540196934649118730> Vous devez vous trouvez dans un cana vocal');
            if (!serverQueue) return msg.channel.send('Aucune musique lancer....');
            if (!args[1]) return msg.channel.send(`le volume actuel est de: **${serverQueue.volume}**`);
            serverQueue.volume = args[1];
            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
            var volval;
            if (serverQueue.volume == 1) {
                volval = `○──── :loud_sound:⠀`
            }
            if (serverQueue.volume == 2) {
                volval = `─○─── :loud_sound:⠀`
            }
            if (serverQueue.volume == 3) {
                volval = `──○── :loud_sound:⠀`
            }
            if (serverQueue.volume == 4) {
                volval = `───○─ :loud_sound:⠀`
            }
            if (serverQueue.volume == 5) {
                volval = `────○ :loud_sound:⠀`
            }
            msg.channel.send(volval)

        } else if (command === 'np') {
            if (!serverQueue) return msg.channel.send('Aucune musique lancer....');
            return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
        } else if (command === 'queue') {
            if (!serverQueue) return msg.channel.send('Aucune musique lancer....');
            return msg.channel.send(`
__**File d'attente:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**En lecture:** ${serverQueue.songs[0].title}
		`);
        } else if (command === 'pause') {
            if (serverQueue && serverQueue.playing) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                return msg.channel.send('⏸ Musique en pause');
            }
            return msg.channel.send('Aucune musique lancer....');
        } else if (command === 'resume') {
            if (serverQueue && !serverQueue.playing) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                return msg.channel.send('▶ Musique reprise');
            }
            return msg.channel.send('Aucune musique lancer....');
        }
        return undefined;

    });
async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log("MOOOOSIK");
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);
        queueConstruct.songs.push(song);
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`Je ne peux pas rejoindre le canal vocal: ${error}`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`Je ne peux pas rejoindre le canal vocal: ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return msg.channel.send(`✅ **${song.title}** a bien été ajouté a la file d'attente`);
    }
    return undefined;
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url)).on('end', reason => {
        if (reason === 'Le Steam ne se génere pas correctement') console.log(reason);
        else console.log(reason);
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
    }).on('error', error => console.error(error));
    var volval;
    if (serverQueue.volume == 1) {
        volval = `○──── :loud_sound:⠀`
    }
    if (serverQueue.volume == 2) {
        volval = `─○─── :loud_sound:⠀`
    }
    if (serverQueue.volume == 3) {
        volval = `──○── :loud_sound:⠀`
    }
    if (serverQueue.volume == 4) {
        volval = `───○─ :loud_sound:⠀`
    }
    if (serverQueue.volume == 5) {
        volval = `────○ :loud_sound:⠀`
    }
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
   var NowEmbed = new Discord.RichEmbed().setColor("990033")
   .addField(`=========================================================`,`
   <a:8104LoadingEmote:540191408641015828> ɴᴏᴡ ᴘʟᴀʏɪɴɢ: **${song.title}**
:white_circle:─────────────────────────────────────────── 
◄◄⠀▐▐ ⠀►►⠀⠀　　${volval}    　　 :gear: ❐ ⊏⊐ 
========================================================= `)
   .setFooter("Tu veux une musique de qualité ?")
.addField("Discord Officiel","https://discord.gg/kwCG3b3")
    .addField("Invite moi dans ton serveur <:503941083424882718:541659459139928065>","**Chitoge**: [Clique ici](https://discordapp.com/api/oauth2/authorize?client_id=532599437252493333&permissions=8&scope=bot)");
    serverQueue.textChannel.send(NowEmbed);
 


}