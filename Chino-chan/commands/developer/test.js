const Discord = require('discord.js'),
	Captcha = require('@haileybot/captcha-generator'),
	fs = require('fs'),
	path = require('path');

exports.run = async (client, message, args)=>{
	var captcha = new Captcha();
	
	/*captcha.PNGStream.pipe(
		fs.createWriteStream(path.join(__dirname, `captcha.png`))
	);*/

	/*mergeImages([
		{
			src:
				'https://static1.s123-cdn-static-a.com/uploads/5186826/2000_60903c7653566.png'
		},
		{ src: `captcha.png`, y: 100, x: 0 }
	]).then(b64 => {
		const h = new Buffer.from(b64, 'base64');
		const i = new Discord.MessageAttachment(h);
		message.channel.send(i);
	});*/

	const a = new Discord.MessageAttachment(captcha.JPEGStream, 'captcha.jpg');

	const embed1 = new Discord.MessageEmbed()
		.setTitle('cok')
		.setImage(`attachment://${a.name}`, 250, 500);

	const embed2 = new Discord.MessageEmbed().setImage(
		'https://static1.s123-cdn-static-a.com/uploads/5186826/2000_60903c7653566.png'
	);

	message.channel.send(embed2);
	message.channel.send({
		embed: embed1,
		files: [a]
	});
};

exports.help = {
	name: 'test'
};

exports.conf = {
	aliases: [],
	cooldown: 10
};
