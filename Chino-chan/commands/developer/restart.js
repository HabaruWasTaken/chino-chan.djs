const Discord = require('discord.js')
//const start = require('./../../index.js')

exports.run = async ( client, message, args ) => {
  if (!client.config.owners.includes(message.author.id)) return;

  message.channel.send(
    new Discord.MessageEmbed()
    .setDescription('Restarting bot...')
  ).then(m => 
  setTimeout(()=>{
    m.edit(
      new Discord.MessageEmbed()
      .setDescription('The bot should\n be on now.')
    )
  }, 4000)
  ).then(process.exit())

}

exports.help = {
  name: "restart"
}

exports.conf = {
  aliases: [],
  cooldown: 5
}