const Discord = require('discord.js');
exports.run = async (client, message, args) => {
	function codeBlock(string, code) {
		if (code) return `\`\`\`${code}\n${string}\`\`\``;
		return `\`\`\`${string}\`\`\``;
	}

	function clean(text) {
		if (typeof text === 'string')
			return text
				.replace(/`/g, '`' + String.fromCharCode(8203))
				.replace(/@/g, '@' + String.fromCharCode(8203));
		else return text;
	}
	if (!client.config.owners.includes(message.author.id)) return;
	
	try {
		const code = args.join(' ');
		const embed1 = new Discord.MessageEmbed()
			.setColor(client.config.colors.error)
			.setDescription('You need to give the code!');
		if (!code) {
			return message.channel.send(embed1);
		}
		let evaled = eval(code);
		let type = typeof evaled;

		if (typeof evaled !== 'string')
			evaled = require('util').inspect(evaled, { depth: 0 });
		let output = clean(evaled);
		output = output.replace(new RegExp(process.env.TOKEN, 'gi'), '*');

		if (output.length > 1024) {
			console.log(output);
			const embed = new Discord.MessageEmbed()
				.setColor(client.config.colors.theme)
				.setDescription(
					codeBlock(
						'Output more than 1024 length! I put the output on your console.',
						'js'
					)
				)
				.addField('Type:', codeBlock(type, 'js'));
			message.channel.send(embed);
		} else {
			const embed = new Discord.MessageEmbed()
				.setColor(client.config.colors.theme)
				.setDescription(codeBlock(output, 'js'))
				.addField('Type:', codeBlock(type, 'js'));
			message.channel.send(embed);
		}
	} catch (err) {
		let error = clean(err);
		if (error.length > 1024) {
			console.log(error);
			const embed = new Discord.MessageEmbed()
				.setColor(client.config.colors.error)
				.setDescription(
					codeBlock(
						'Output more than 1024 length! I put the output on your console.',
						'js'
					)
				)
				.addField('Type:', codeBlock(this.type, 'js'));
			message.channel.send(embed);
		} else {
			const embed = new Discord.MessageEmbed()
				.setColor(client.config.colors.error)
				.setDescription(codeBlock(error, 'js'))
				.addField('Type:', codeBlock(this.type, 'js'));
			message.channel.send(embed);
		}
	}
};

exports.help = {
	name: 'eval',
	description: 'Evaluate some code.',
	usage: 'eval <some code>',
	example: 'eval console.log("a")',
	aliases: ['ev']
};

exports.conf = {
	aliases: ['ev'],
	cooldown: 6
};
