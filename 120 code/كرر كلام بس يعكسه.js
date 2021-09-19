client.on('message', message => {
    // اذا كان الشخص بوت ماينفذ الامر
    if (message.author.bot) return;
    
    // `!`يتاكد ان الامر بدا بـ 
    if (message.content.indexOf('$un') === 0) {
        //  `!` ياخذ الرساله بس بدون الـ
        var text = message.content.substring(1);
        
        // يعكس الكلام
        var reversed = '';
        var i = text.length;
        
        while (i > 0) {
            reversed += text.substring(i - 1, i);
            i--;
        }
        
        // يرسله الرساله بالعكس مع المنشن
        message.reply(reversed);
    }
});