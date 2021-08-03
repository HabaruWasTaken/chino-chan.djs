const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	const invPath = `a${message.author.id}.inv`;

	let a = client.db.get(invPath);

	if (a === null) {
		message.channel.send(
			new Discord.MessageEmbed().addField('Your Inventory:', 'None')
		);
	}

	const pages = args[0] - 1 || 0;

	let page = a.length / 10;

	if (page > page.toFixed(0)) {
		page = page.toFixed(0)
		page++;
	} else {
	  page = page.toFixed(0);
	}
	
	if (pages>page) return message.channel.send(
	  new Discord.MessageEmbed()
	  .setColor(client.colors.error)
	  .setTitle('Can\'t find that page!')
	  .setDescription('Please provide a valid page!')
	  )
	const min = pages * 10;
	const max = pages * 10 + 11;

	if (message.flags[0] == 'sort') {
		const ar = message.flags[1];

		if (ar == 't' || ar == 'tier') {
			a.sort(function(a, b) {
				return a.data[0].tier - b.data[0].tier;
			});
		} else if (ar == 'i' || ar == 'issue') {
			a.sort(function(a, b) {
				return a.data[0].issue - b.data[0].issue;
			});
		} else if (ar == 'n' || ar == 'name') {
			a.sort(function(a, b) {
				var n1 = a.data[0].name.toLowerCase();
				var n2 = b.data[0].name.toLowerCase();
				if (n1 < n2) return -1;
				if (n1 > n2) return 1;
				return 0;
			});
		}
	}

	if (a.length <= 10) {
		let text = '';

		for (i = 0; i < a.length; i++) {
			text += '`' + a[i].code + '` **';
			for (let h in a[i].data) {
				text += a[i].data[h].name + '**, Tier: `';
				text += a[i].data[h].tier + '`, Issue: `#';
				text += a[i].data[h].issue + '`\n';
			}
		}

		message.channel.send(
			new Discord.MessageEmbed().addField('Your Inventory:', text)
		);
	} else if (a.length > 10) {
		let text = '';
		for (i = 0; i < a.length; i++) {
			if (i <= max && i >= min) {
				text += '`' + a[i].code + '` **';
				for (let h in a[i].data) {
					text += a[i].data[h].name + '**, Tier: `';
					text += a[i].data[h].tier + '`, Issue: `#';
					text += a[i].data[h].issue + '`\n';
				}
			}
		}
		message.channel.send(
			new Discord.MessageEmbed()
				.addField('Your Inventory:', text)
				.setFooter(`Showing page ${pages + 1} from ${page} pages.`)
		);
	}
};

exports.help = {
	name: 'testinv'
};

exports.conf = {
	aliases: [],
	cooldown: 10
};
