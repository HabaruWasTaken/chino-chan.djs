const Discord = require('discord.js'), fs = require('fs')

exports.run = async (client, message, args) => {
  
  const permDe = new Discord.MessageEmbed()
  .setColor(client.config.colors.error)
  .setTitle("Permission denied!")
  .setDescription("You need \'MANAGE_GUILD\' permission to run this command!")
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(permDe)
  
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
  
  let tsets = JSON.parse(fs.readFileSync('./timerSetting.json', 'utf8'))
  
  if (!tsets[message.guild.id]) {
		tsets[message.guild.id] = {
			tsets: true
		};
	}
  
  if (tsets[message.guild.id].tsets==a) return message.channel.send(
    new Discord.MessageEmbed()
    .setColor(client.colors.error)
    .setTitle(`Can\`t set the timer to ${a}!`)
    .setDescription(`The timer is already ${a}`)
    )
  
	 tsets[message.guild.id] = {
	   tsets: a
	 }
	
	fs.writeFileSync('./timerSetting.json', JSON.stringify(tsets), (err) => {
	  if (err) console.log(err)
	})
	
	const setted = new Discord.MessageEmbed()
	.setColor(client.config.colors.theme)
	.setTitle('Successfull!')
	.setDescription(`Timer for ${message.guild.name} changed to ${a}`)
	
	message.channel.send(setted)
	
}

exports.help = {
  name: "timersetting",
  description: "Set shoob timer for guild.",
  aliases: ["timer"],
  usage: "timersetting <true/false>",
  example: "timersetting true"
}

exports.conf = {
  aliases: ["timer"],
  cooldown: 10
}