const MPPClient = require('mppclone-client');

const { MPPCLONE_TOKEN } = process.env;

class Bot {
	constructor(channel, uri) {
		this.client = new MPPClient(uri || 'wss://mppclone.com:8443', MPPCLONE_TOKEN);
		this.client.setChannel(channel);
	}

	start() {
		this.client.start();
	}

	stop() {
		this.client.stop();
	}

	bindEventListeners() {
		this.client.on('a', msg => {
			console.log(`[${msg.p._id.substring(0, 6)}] <${msg.p.name}> ${msg.a}`);

			if (msg.a.startsWith('crickets are good')) {
				this.sendChat(`no they're not`);
			}
		});
	}

	sendChat(txt) {
		this.client.sendArray([{
			m: 'a',
			message: `\u034f${txt}` // unicode for protection
		}]);
	}

	setUser(name, color) {
		this.client.sendArray([{ m: 'userset', set: { name, color } }]);
	}
}

module.exports = { Bot }
