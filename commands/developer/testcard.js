exports.run = async (client, message, args) => {
	const a = client.db.get('acard');
	const cardCode = args[0];
	
	const cardDatas = a.find(card => {
		return card.code == cardCode;
	});
	const cardData = cardDatas.data[0];
	const au = cardData.owner;
	const url = cardData.image;
	const text = `Owner: <@${au}>\nName: \`${cardData.name}\`\nTier: \`${
		cardData.tier}\`\nIssue: \`#${cardData.issue}\`\nCard code: \`${cardCode}\``;
	const Discord = require('discord.js');

	message.channel.send(
		new Discord.MessageEmbed().setImage(url).addField('Card info', text)
	);
};

exports.help = {
	name: 'testcard'
};

exports.conf = {
	aliases: [],
	cooldown: 10
};
