client.on('message', msg => {
    if (msg.content === 'احبك') {
      msg.reply('**لاتحتك يا اخوي لو سمحت**');
    }
  });