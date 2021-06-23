const Discord = require('discord.js')

exports.run = async (client, message, args) => {

  let icon = message.guild.iconURL({ dynamic: true, size: 4096})

  const fail = new Discord.MessageEmbed()
  .setColor(client.config.colors.error)
  .setTitle('Can\'t showing icon!')
  .setDescription('This server don\'t have icon!')

  if (icon == null) return message.channel.send(fail)

  const embed = new Discord.MessageEmbed()
  .setColor(client.config.colors.theme)
  .setImage(icon)
  .setTitle(`${message.guild.name}\'s icon`)
  .setDescription(`[Guild icon of ${message.guild.name}](${icon})`)

  message.channel.send(embed)
}

exports.help = {
  name: "guildicon", 
  description: "Get guild icon.",
  aliases: ["gicon", "sicon", "servericon"],
  usage: "guildicon",
  example: "guildicon"
}

exports.conf = {
  aliases: ["gicon", "sicon", "servericon"],
  cooldown: 10
}