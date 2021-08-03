const Discord = require('discord.js'), fs = require('fs')

exports.run = async (client, message, args) => {

  const permDe = new Discord.MessageEmbed()
  .setColor(client.config.colors.error)
  .setTitle("Permission denied!")
  .setDescription("You need \'MANAGE_MESSAGES\' permission to run this command!")
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(permDe)

  let fail = new Discord.MessageEmbed()
  .setColor(client.config.colors.error)
  .setTitle('Can\'t send empty message!')
  .setDescription('You need provide an arguments!')

  const embed = new Discord.MessageEmbed()
  .setColor(client.config.colors.theme)
  .setDescription(args.join(" "))

  if (!args || !args[0]) return message.channel.send(fail)

  message.delete()
  message.channel.send(embed)
}

exports.help = {
  name: "say",
  description: "Saying something.",
  usage: "say <arguments>",
  example: "say Hello"
}

exports.conf = {
  aliases: [],
  cooldown: 10
}