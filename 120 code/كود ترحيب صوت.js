const ytdl = require('ytdl-core');

client.on('message', message => {
  if (message.content.startsWith('آالامر الي تبيه يرحب ف الروم الي انت فيه ')) {
    const voiceChannel = message.member.voiceChannel;
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("هنا الرابط مقطع اليوتيوب الي تبيه يرحب فيه ", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
                dispatcher.on('end', () => voiceChannel.leave());

      });
  }
})
//npm i ytdl-core