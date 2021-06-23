const Discord = require('discord.js'),
	fs = require('fs');

exports.run = async (client, message, args) => {

	const prefixes = JSON.parse(fs.readFileSync('./prefixes.json', 'utf8'));

	if (!prefixes[message.guild.id]) {
		prefixes[message.guild.id] = {
			prefixes: client.config.prefix
		};
	}

	let prefix = prefixes[message.guild.id].prefixes;

	if (!args[0]) {

		let module = client.helps.array();

		if (!client.config.owners.includes(message.author.id))
			module = client.helps.array().filter(x => !x.hide);

		const embed = new Discord.MessageEmbed()
			.setColor(client.config.colors.theme)
			.setTimestamp(new Date())
			.setDescription(
				`Type \`${prefix}help [command]\` to get more specific information about a command.`
			)
			.setTitle(`Help command for ${message.guild.name}`)
			.setAuthor(`Chino-chan`, `${client.user.displayAvatarURL()}`)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setFooter(
				'By Habaru',
				message.guild.members.cache
					.get('713284455875215381')
					.user.displayAvatarURL()
			);

		for (const mod of module) {

			embed.addField(
				`${mod.name}`,
				mod.cmds
					.map(x => `\`${x.slice(0, 1).toUpperCase() + x.slice(1)}\``)
					.join(' **|** ')
			);
		}

		return message.channel.send(embed);
	} else {
		let cmd = args[0];

		if (
			client.commands.has(cmd) ||
			client.commands.get(client.aliases.get(cmd))
		) {
			let command =
				client.commands.get(cmd) ||
				client.commands.get(client.aliases.get(cmd));
			let nameLower = command.help.name;
			let name = nameLower[0].toUpperCase() + nameLower.slice(1);

			let desc = command.help.description; 

			let cooldown = command.conf.cooldown + ' second(s)'; 

			let aliases = command.conf.aliases.join(', ')
				? command.conf.aliases.join(', ')
				: 'No aliases provided.';
			let usage = command.help.usage
				? command.help.usage
				: 'No usage provided.';
			let example = command.help.example
				? command.help.example
				: 'No example provided.';

			let embed = new Discord.MessageEmbed()
				.setColor(client.config.colors.theme)
				.setTitle(name)
				.setDescription(desc)
				.setThumbnail(client.user.displayAvatarURL())
				.setFooter(
					"[] optional, <> required. Don't includes these things while typing a command."
				)
				.addField('Cooldown', cooldown)
				.addField('Aliases', aliases, true)
				.addField('Usage', usage, true)
				.addField('Example', prefix + example, true);

			return message.channel.send(embed);
		} else {

			return message.channel.send({
				embed: {
					color: client.config.colors.error,
					description: 'Unknown command.'
				}
			});
		}
	}
};

exports.help = {
	name: 'help',
	description: 'Show a command list.',
	usage: 'help [command]',
	example: 'help ping'
};

exports.conf = {
	aliases: [],
	cooldown: 5
};
