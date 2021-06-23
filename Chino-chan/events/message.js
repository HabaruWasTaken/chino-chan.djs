const Discord = require('discord.js'),
	cooldowns = new Discord.Collection(),
	fs = require('fs'),
	db = require('quick.db');

module.exports = async (client, message) => {
  
  
  
  
	//shoob
	let shoobId = '673362753489993749';
	
	const tsets = JSON.parse(fs.readFileSync('./timerSetting.json', 'utf8'));

	if (!tsets[message.guild.id]) {
		tsets[message.guild.id] = {
			tsets: true
		};
	}
	
	let tset = tsets[message.guild.id].tsets

	if (message.author.id == shoobId) {
		if (!message.embeds[0]) return;

		if (message.embeds[0].title&&message.embeds[0].title.includes('Tier:')) {
		  
		  if (tset==false) return;
			if (!tset==true) return;
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
					.setColor("GREEN")
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
	
	
	
	
	
	
  //message
	if (message.author.bot || message.author === client.user) return;

	if (message.channel.type === 'dm') return;

	const prefixes = JSON.parse(fs.readFileSync('./prefixes.json', 'utf8'));

	if (!prefixes[message.guild.id]) {
		prefixes[message.guild.id] = {
			prefixes: client.config.prefix
		};
	}

	let [prefix] = prefixes[message.guild.id].prefixes;

	const mentionRegex = `<@${client.user.id}>`;
	const mentionRegexPrefix = `<@${client.user.id}> `;

	const prefixNew = message.content.match(mentionRegexPrefix)
		? message.content.match(mentionRegexPrefix)[0]
		: prefix;

	if (message.content == mentionRegex)
		message.channel.send(
			`My prefix for ${message.guild.name} is \`${prefixNew}\`.`
		);

	if (!message.content.startsWith(prefixNew)) return;

	let args = message.content
		.slice(prefixNew.length)
		.trim()
		.split(/ +/g);
	let msg = message.content.toLowerCase();
	let cmd = args.shift().toLowerCase();

	let sender = message.author;

	message.flags = [];
	while (args[0] && args[0][0] === '-') {
		message.flags.push(args.shift().slice(1));
	}

	let commandFile =
		client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
	if (!commandFile) return;

	if (!cooldowns.has(commandFile.help.name))
		cooldowns.set(commandFile.help.name, new Discord.Collection());

	const member = message.member,
		now = Date.now(),
		timestamps = cooldowns.get(commandFile.help.name),
		cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;

	if (!timestamps.has(member.id)) {
		if (!client.config.owners.includes(message.author.id)) {
			timestamps.set(member.id, now);
		}
	} else {
		const expirationTime = timestamps.get(member.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			const embed = new Discord.MessageEmbed()
				.setColor(client.config.colors.error)
				.addField(
					'**You are in cooldown!**',
					`Please wait \`${timeLeft.toFixed(1)} seconds\`.`
				);
			return message.channel.send(embed);
		}

		timestamps.set(member.id, now);
		setTimeout(() => timestamps.delete(member.id), cooldownAmount);
	}

	try {
		if (!commandFile) return;
		commandFile.run(client, message, args);
	} catch (error) {
		console.log(error.message);
	} finally {
		console.log(`${sender.tag} (${sender.id}) ran a command: ${cmd}`);
	}
};
