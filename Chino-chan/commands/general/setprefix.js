const Discord = require('discord.js'), fs = require('fs')

exports.run = async (client, message, args) => {
  
  const permDe = new Discord.MessageEmbed()
  .setColor(client.config.colors.error)
  .setTitle("Permission denied!")
  .setDescription("You need \'MANAGE_GUILD\' permission to run this command!")
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(permDe)
  
  const noAr = new Discord.MessageEmbed()
  .setColor(client.config.colors.error)
  .setTitle('No prefix provided!')
  .setDescription("You need provide a prefix!")
  if(!args) return message.channel.send(noAr)
  
  const prefixes = JSON.parse(fs.readFileSync('./prefixes.json', 'utf8'))
  
	 prefixes[message.guild.id] = {
	   prefixes: args
	 }
	
	fs.writeFileSync('./prefixes.json', JSON.stringify(prefixes), (err) => {
	  if (err) console.log(err)
	})
	
	const setted = new Discord.MessageEmbed()
	.setColor(client.config.colors.theme)
	.setTitle('Successfull!')
	.setDescription(`Prefix for ${message.guild.name} changed to ${args}`)
	
	message.channel.send(setted)
	
}

exports.help = {
  name: "setprefix",
  description: "Set costum prefix for guild.",
  aliases: ["prefix"],
  usage: "setprefix <prefix>",
  example: "setprefix c."
}

exports.conf = {
  aliases: ["prefix"],
  cooldown: 10
}