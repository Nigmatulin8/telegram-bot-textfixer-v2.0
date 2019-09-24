const Bot = require('./components/TelegramBot');
const findInFiles = require('find-in-files');
const fn = require('./components/functional');

const token = '488821463:AAG13Gnk7yyD6D1xzk3BFcGbu2VaG_MCumc';
const bot = new Bot(token);

console.log('Bot has been started!');
//bot chat id = 41821765
//bot.sendMessage(41821765, textFixer(text));

bot.on('message', async msg => {
	if (msg.text) {
		let text = msg.text.toLowerCase();

		if ((text[0] >= 'a' && text[0] <= 'z') || (text[0] === '[') || (text[0] === ']')) {
			let chatID = msg.chat.id;

			let flag = true;
			let forWordCheck = text.match(/\w{1,1000}/g);

			for (let i = 0; i < forWordCheck.length; i++) {
				let result = '!' + forWordCheck[i] + ', ';  
				let findedWords = await findInFiles.find(result, '.', 'words.txt');
			
				if (isEmptyObject(findedWords)) flag = true;
				else { flag = false; break; }
			}

			if (!flag) {
				fn.messageSend(msg, text, chatID, bot);
			}

		}
	}
});


function isEmptyObject(obj) {
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            return true;
        }
    }
    return false;
}

bot.longPooling();
