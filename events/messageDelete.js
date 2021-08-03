module.exports = async (client, message) => {

  if (message.author.bot || message.author === client.user) return;

	if (message.channel.type === 'dm') return;

  let snipes = client.snipes.get(message.channel.id) || []

  if (snipes.length > 5) snipes = snipes.slice(0, 4)

  if (!message.attachments.first()) {
    snipes.unshift({
      msg: message,
      time: Date.now()
    })
  } else {
    snipes.unshift({
      msg: message,
      image: message.attachments.first().url,
      time: Date.now()
    })
  }

  client.snipes.set(message.channel.id, snipes)
}