const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	const permDe = new Discord.MessageEmbed()
		.setColor(client.config.colors.error)
		.setTitle('Permission denied!')
		.setDescription(
			"You need 'MANAGE_MESSAGES' permission to run this command!"
		);
	if (!message.member.hasPermission('MANAGE_MESSAGES'))
		return message.channel.send(permDe);

	let fail = new Discord.MessageEmbed()
		.setColor(client.config.colors.error)
		.setTitle("Can't delete message!")
		.setDescription('You need provide a valid number!');

	if (!args || !args[0] || isNaN(args[0]) || parseInt(args[0] <= 0))
		return message.channel.send(fail);

	let deleteAmount;

	if (parseInt(args[0]) > 100) {
		deleteAmount = 100;
	} else {
		deleteAmount = parseInt(args[0]);
	}

	message.delete();

	message.channel.bulkDelete(deleteAmount, true).then(deleted => {
		message.channel
			.send(
				new Discord.MessageEmbed()
					.setColor(client.config.colors.theme)
					.setDescription(`Deleted ${deleted.size} messages!`)
			)
			.then(m => {
				setTimeout(() => {
					m.delete();
				}, 5000);
			});
	});
};

exports.help = {
	name: 'clear',
	aliases: ['purge'],
	description: 'Delete some message.',
	usage: 'clear <number>',
	example: 'clear 10'
};

exports.conf = {
	aliases: ['purge'],
	cooldown: 10
};
