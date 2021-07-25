const fs = require('fs'),
	Discord = require('discord.js');

module.exports = async (client, message) => {
	let shoobId = '673362753489993749';

	const tsets = JSON.parse(fs.readFileSync('./timerSetting.json', 'utf8'));

	if (!tsets[message.guild.id]) {
		tsets[message.guild.id] = {
			tsets: true
		};
	}

	let tset = tsets[message.guild.id].tsets;

	if (message.author.id == shoobId) {
		if (!message.embeds[0]) return;

		if (message.embeds[0].title && message.embeds[0].title.includes('Tier:')) {
			if (tset == false) return;
			if (!tset == true) return;
			let num = 15;
			let tc;

			setInterval(() => {
				num--;
				if (num >= 11) {
					tc = 'GREEN';
				} else if (num >= 6) {
					tc = 'YELLOW';
				} else {
					tc = 'RED';
				}
			}, 1000);

			let a = message.channel.send(
				new Discord.MessageEmbed()
					.setDescription(`${num} seconds left before card despawn.`)
					.setColor('GREEN')
			);
			a.then(m => {
				let b = setInterval(() => {
					if (num == 0) {
						clearInterval(b);
						return m.delete();
					}
					m.edit(
						new Discord.MessageEmbed()
							.setDescription(`${num} seconds left before card despawn.`)
							.setColor(tc)
					);
				}, 1000);
			});
		}
	}
};
