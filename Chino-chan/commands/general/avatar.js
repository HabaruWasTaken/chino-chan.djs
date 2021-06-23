const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	let user = getMember(message, args.join(' ')).user;

	if (!user) return;

	let av = user.displayAvatarURL({
		size: 4096,
		dynamic: true
	});

	const embed = new Discord.MessageEmbed()
		.setColor(client.config.colors.theme)
		.setImage(av)
		.setTitle(`${user.tag} avatar`)
		.setDescription(`[Avatar URL of ${user.tag}](${av})`);

	message.channel.send(embed);

	function getMember(message, toFind = '') {
		toFind = toFind.toLowerCase();

		let target = message.guild.members.cache.get(toFind);

		if (!target && message.mentions.members)
			target = message.mentions.members.first();

		if (!target && toFind) {
			target = message.guild.members.cache.find(member => {
				return (
					member.displayName.toLowerCase().includes(toFind) ||
					member.user.tag.toLowerCase().includes(toFind)
				);
			});
		}

		if (!toFind) target = message.member;

		const fail = new Discord.MessageEmbed()
			.setColor(client.config.colors.error)
			.setTitle("Can't find that member!")
			.setDescription("Please use member's ID");
		if (!target) return message.channel.send(fail);

		return target;
	}
};

exports.help = {
	name: 'avatar',
	aliases: ['av'],
	description: 'Get user avatar.',
	usage: 'avatar [user tag/id/nickname]',
	example: 'av @Habaru'
};

exports.conf = {
	aliases: ['av'],
	cooldown: 5
};
