const Discord = require('discord.js'), moment = require('moment')

exports.run = async (client, message, args) =>{

  const snipes = client.snipes.get(message.channel.id)

  if (!snipes) return message.channel.send(
    new Discord.MessageEmbed()
    .setColor(client.colors.error)
    .setTitle('There is no deleted message!')
    .setDescription('There is nothing to snipe!')
  )

  const snipe = +args[0] - 1 || 0
  const target = snipes[snipe]

  if (!target) return message.channel.send(
    new Discord.MessageEmbed()
    .setColor(client.colors.error)
    .setTitle(`There is no pages ${snipe}`)
    .setDescription(`There is only ${snipes.length} pages`)
  )

  let { msg, image, time } = target

if (!image) {
  image = ""
}

 if (!image && !msg) return message.channel.send(
   new Discord.MessageEmbed()
   .setColor(client.colors.error)
   .setDescription('There is nothing to snipe!')
 )

  message.channel.send(
    new Discord.MessageEmbed()
    .setColor(client.colors.theme)
    .setImage(image)
    .setTitle(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
    .setDescription(msg.content)
    .setFooter(`${moment(time).fromNow()} | ${snipe+1}/${snipes.length} pages`)
  )
}

exports.help = {
  name: "snipe",
  description: "Showing deleted message.",
  usage: "snipe <pages>",
  example: "snipe 2"
}

exports.conf = {
  aliases: [],
  cooldown: 10
}