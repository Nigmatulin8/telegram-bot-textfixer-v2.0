const TGBot = require('./tg');

class NewBot extends TGBot {
	constructor(token) {
		super();

		this._offset = undefined;
		this.token = token;

		super.getToken(this.token);
	}

	_processUpdates(updates) {
		updates.result.forEach(update => {
			this._offset = update.update_id + 1;
			let message = update.message;
			if(message) {
				this.emit('message', message);
			}
		});
	}

	longPooling() {
		return super.getUpdates(this._offset).then(updates => {
			if (updates !== undefined) {
        		this._processUpdates(updates);
      		}
      		return null;
		}).catch(error => {
        	throw error;
    	}).finally(() => {
     		setTimeout(() => this.longPooling(), 100);
    	});
	}
}

module.exports = NewBot;