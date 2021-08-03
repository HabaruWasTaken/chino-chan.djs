const Discord = require('discord.js'), moment = require('moment')

exports.run = async (client, message, args) =>{

  const esnipes = client.esnipes.get(message.channel.id)

  if (!esnipes) return message.channel.send(
    new Discord.MessageEmbed()
    .setColor(client.colors.error)
    .setTitle('There is no edited message!')
    .setDescription('There is nothing to snipe!')
  )

  const esnipe = +args[0] - 1 || 0
  const target = esnipes[esnipe]

  if (!target) return message.channel.send(
    new Discord.MessageEmbed()
    .setColor(client.colors.error)
    .setTitle(`There is no pages ${esnipe}`)
    .setDescription(`There is only ${esnipes.length} pages`)
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
    .setFooter(`${moment(time).fromNow()} | ${esnipe+1}/${esnipes.length} pages`)
  )
}

exports.help = {
  name: "editsnipe",
  aliases: ["esnipe"],
  description: "Showing edited message.",
  usage: "esnipe <pages>",
  example: "esnipe 2"
}

exports.conf = {
  aliases: ["esnipe"],
  cooldown: 10
}