module.exports = async (client, message) => {

  if (message.author.bot || message.author === client.user) return;

	if (message.channel.type === 'dm') return;

  let esnipes = client.esnipes.get(message.channel.id) || []

  if (esnipes.length > 5) esnipes = esnipes.slice(0, 4)

  if (!message.attachments.first()) {
    esnipes.unshift({
      msg: message,
      time: Date.now()
    })
  } else {
    esnipes.unshift({
      msg: message,
      image: message.attachments.first().url,
      time: Date.now()
    })
  }

  client.esnipes.set(message.channel.id, esnipes)
}