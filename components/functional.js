module.exports = fn = {
    messageSend: async function(messageObject, text, chatId, bot) {
        let admins = await Promise.resolve(bot.getChatAdministrators(chatId));
        let date = Date(messageObject.date).match(/\d\d:\d\d/);
    
        if (__isAdmin(admins)) {
            bot.deleteMessage(chatId, messageObject.message_id);
            bot.sendMessage(chatId, `${messageObject.from.first_name} said: "${__textFixer(text, alphabet)}"  ${date}`);
        }
        else {
            bot.sendMessage(chatId, `${messageObject.from.first_name} said: "${__textFixer(text, alphabet)}"  ${date}`);
        }
    }
}

const alphabet = {
	'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з', 
	'[': 'х', ']': 'ъ', 'a': 'ф', 's': 'ы', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д',
	';': 'ж', '\u0027': 'э', 'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т', 'm': 'ь', ',': 'б', '.': 'ю', 
	
	' ': ' ', '&': '?', 
	'!': '!', ')': ')', '(': '(', '?': ',', '/': '.', '-': '-', '+': '+', '=': '='
};

function __isAdmin(tgUser) {
	for(let i=0; i < tgUser.result.length; i++) {
		if (tgUser.result[i].user.username === 'TexFixer_bot') {
			return true;
		}
    }
    
	return false;
}

function __textFixer(msg, alphabet) {
	let edited = "";

	for(let i = 0; i < msg.length; i++) {
		if (i === 0) {
			edited += alphabet[msg[i]].toUpperCase();
		}
		else if ((msg[i] >= 0) && (msg[i] <= 9)) {
			edited += msg[i];
		}
		else {
			edited += alphabet[msg[i]]
		}
	}

	return edited;
}