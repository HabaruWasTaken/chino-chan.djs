const Discord = require('discord.js'), fs = require('fs')

exports.run = async (client, message, args) => {
  
  const noAr = new Discord.MessageEmbed()
  .setColor(client.config.colors.error)
  .setTitle('No argument provided!')
  .setDescription("You need provide an argument!")
  if(!args[0]) return message.channel.send(noAr)
  
  let a;
  
  if (args[0]=="true") {
    a = true
  } else if (args[0]=="false"){
    a = false
  } else {
    return message.channel.send(
      new Discord.MessageEmbed()
      .setColor(client.colors.error)
      .setTitle('Invalid argument!')
      .setDescription('Argument should be <true/false>!')
      )
  }
  
  let wsets = JSON.parse(fs.readFileSync('./owoSetting.json', 'utf8'))
  
  if (!wsets[message.author.id]) {
        wsets[message.author.id] = {
            wsets: true
        };
    }
  
  if (wsets[message.author.id].tsets==a) return message.channel.send(
    new Discord.MessageEmbed()
    .setColor(client.colors.error)
    .setTitle(`Can\`t owo reminder the timer to ${a}!`)
    .setDescription(`The owo reminder is already ${a}`)
    )
  
     wsets[message.author.id] = {
       wsets: a
     }
    
    fs.writeFileSync('./owoSetting.json', JSON.stringify(wsets), (err) => {
      if (err) console.log(err)
    })
    
    const setted = new Discord.MessageEmbed()
    .setColor(client.config.colors.theme)
    .setTitle('Successfull!')
    .setDescription(`Reminder for ${message.author.username} changed to ${a}`)
    
    message.channel.send(setted)
    
}

exports.help = {
  name: "oworeminder",
  description: "Set owo reminder.",
  aliases: ["owor"],
  usage: "oworeminder <true/false>",
  example: "oworeminder true"
}

exports.conf = {
  aliases: ["owor"],
  cooldown: 10
}