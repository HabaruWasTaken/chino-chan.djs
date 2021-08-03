const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	message.channel.send('Pinging...').then(a => {
		var ping = a.createdTimestamp - message.createdTimestamp;
		const embed = new Discord.MessageEmbed()
			.addFields(
				{
					name: '**Bot latency:**',
					value: `\`${ping}ms\``
				},
				{
					name: '**API latency:**',
					value: `\`${client.ws.ping}ms\``
				}
			)
			.setColor(client.config.colors.theme);
		a.delete();
		message.channel.send(embed);
	});
};

exports.help = {
	name: 'ping',
	description: 'Check if the bot was online.',
	usage: 'ping',
	example: 'ping'
};

exports.conf = {
	aliases: ['test'],
	cooldown: 5 // Integer() = second.
};
