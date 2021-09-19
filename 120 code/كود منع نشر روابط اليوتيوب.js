client.on(`message`, message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes(`youtube`)){
    message.delete()
    return message.reply(`**يمنع نشر روابط اليوتيوب **`)
}
});

//ملاحظة : لو تبي تغير يعني مو يوتيوب اي شي تبيه فيس بوك الخ .. تغير كلمة يوتيوب