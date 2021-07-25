const Discord = require('discord.js');
const fs = require('fs')

module.exports = async (client, message) => {
	function getMember(message, toFind = '') {
		toFind = toFind.toLowerCase();

		target = message.guild.members.cache.find(member => {
			return (
				member.displayName.toLowerCase().includes(toFind) ||
				member.user.tag.toLowerCase().includes(toFind)
			);
		});

		return target;
	}

	function owo(message, name, command, second) {
		setTimeout(() => {
			message.channel.send(`<@${name}>, ready to \`${command}\`!`);
		}, second);
	}

	const owoId = '408785106942164992';

	function owoSet(author) {
		const wsets = JSON.parse(fs.readFileSync('./owoSetting.json', 'utf8'));

		if (!wsets[author]) {
			wsets[author] = {
				wsets: true
			};
		}

		let wset = wsets[author].wsets;
		return wset;
	}

	if (message.author.id == owoId) {
		const msgOwo = message.content;
		let owoAuthor;

		if (msgOwo.includes('hunt is empowered by')) {
			const name = msgOwo.split('**')[1].slice(5);

			owoAuthor = getMember(message, name).user.id;

			if (owoAuthor == '689830159909650495') return;

			const owoS = owoSet(owoAuthor);

			if (owoS == false) return;

			const command = 'owohunt';

			owo(message, owoAuthor, command, 14000);
		}

		if (
			message.embeds[0] &&
			message.embeds[0].author &&
			message.embeds[0].author.name.includes('goes into battle!')
		) {
			const name = message.embeds[0].author.name.split(' ')[0];

			owoAuthor = getMember(message, name).user.id;

			const owoS = owoSet(owoAuthor);

			if (!owoS == true || owoS == false) return;

			const command = 'owobattle';

			owo(message, owoAuthor, command, 14000);
		}
	}
};
