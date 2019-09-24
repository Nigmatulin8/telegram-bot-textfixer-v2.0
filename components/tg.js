const request = require('request-promise');
const EventEmitter = require('events');

class TGBot extends EventEmitter {
	constructor () {
		super();
		this.token = undefined;
	}

	getToken(token) {
		this.token = token;

		if (token === undefined) {
			throw new Error ('Please, enter the token');
		}
	}

	_request (method, params) {
		if (arguments.length === 0 || typeof arguments[0] !== 'string') {
			throw new Error ('Please provide method as a string');
		};

		let options = {
			url: `https://api.telegram.org/bot${this.token}/${method}`,
      		resolveWithFullResponse: true,
      		qs: params
		};

		return request(options).then(response => {
			if(response.statusCode !== 200) {
				throw new Error(response.statusCode + ':\n'+ response.body);
			}

			let updates = JSON.parse(response.body);

			if(updates.ok) {
			 	return updates;
			}
		}).catch(error => {
			throw new Error(error);
		});
	}

	getUpdates(offset) {
		let params = {
			offset: offset,
			timeout: 120
		};
		return this._request('getUpdates', params);
	}

	getMe() {
		return this._request('getMe');
	}

	sendMessage(chatId, text, callback) {
		let params = {
			chat_id: chatId,
			text: text
		};
		return this._request('sendMessage', params);
	}

	getChatAdministrators(chatId) {
		let params = {
			chat_id: chatId,
		};
		return this._request('getChatAdministrators', params);
	}

	deleteMessage(chatId, messageId) {
		let params = {
			chat_id: chatId,
			message_id: messageId
		};

		return this._request('deleteMessage', params);
	}
}

module.exports = TGBot;