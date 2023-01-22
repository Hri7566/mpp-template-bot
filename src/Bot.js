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

		/**
		 * ? Further explanation for the weird unicode character:
		 * 
		 * If someone sets their name to a
		 * bot command, this could potentially
		 * run commands as this bot, which is
		 * something we want to avoid at all
		 * costs. Another way to potentially
		 * solve this is checking if the user
		 * is us/another bot with either the
		 * tag or the user ID (_id).
		 */
	}
}

/**
 * if you would rather pass the token
 * in for each instance of the bot
 * instead of using the same one,
 * you can literally just put
 * it in the constructor
 */

module.exports = { Bot }
