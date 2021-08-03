const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  
	function timeConverter(totalSeconds) {
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);

		let time = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
		return time;
	}
	
	let uptime = timeConverter((client.uptime/1000))
	const embed = new Discord.MessageEmbed()
	.setColor(client.config.colors.theme)
	.setTitle("Uptime:")
	.setDescription(uptime)
	
	message.channel.send(embed)
	
};

exports.help = {
	name: 'uptime',
	description: "Get bot's uptime.",
	usage: 'uptime',
	example: 'uptime'
};

exports.conf = {
	aliases: [],
	cooldown: 10
};
