client.on('message', message => {
    if(message.content.startsWith('m!sa')) {
    let args = message.content.split(' ').slice(1);
    let ar = args.join(' ');

    message.channel.send(ar,{tts:true});
}
});