exports.run = async (client, message, args) => {
  const moment = require('moment'), Discord = require('discord.js')

  const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
  };

  const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    VERY_HIGH: 'Very high'
  };

  const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydeny: 'Sydeny',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
  };

  function trimArray(arr, maxLen = 10) {
    if (arr.length > maxLen) {
      const len = arr.length - maxLen;
      arr = arr.slice(0, maxLen);
      arr.push(`${len} more...`);
    }
    return arr.join(', ');
  }


  const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
  const members = message.guild.members.cache;
  const channels = message.guild.channels.cache;
  const emojis = message.guild.emojis.cache;

 const owner =  await message.guild.members.fetch(message.guild.ownerID)

  const embed = new Discord.MessageEmbed()
    .setTitle(`Guild information for **${message.guild.name}**`)
    .setColor(client.config.colors.theme)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField('General', [
      `**❯ Name:** ${message.guild.name}`,
      `**❯ ID:** ${message.guild.id}`,
      `**❯ Owner:** ${owner.user.tag} (${owner.user.id})`,
      `**❯ Region:** ${regions[message.guild.region]}`,
      `**❯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
      `**❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
      `**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
      `**❯ Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} \n(${moment(message.guild.createdTimestamp).fromNow()})`,
      '\u200b'
    ])
    .addField('Statistics', [
      `**❯ Role Count:** ${roles.length}`,
      `**❯ Emoji Count:** ${emojis.size}`,
      `**❯ Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
      `**❯ Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
      `**❯ Member Count:** ${message.guild.memberCount}`,
      `**❯ Humans:** ${members.filter(member => !member.user.bot).size}`,
      `**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
      `**❯ Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
      `**❯ Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
      `**❯ Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
      '\u200b'
    ])
    .addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? trimArray(roles) : 'None')
    .setTimestamp();
  message.channel.send(embed);

}

exports.help = {
  name: "guildinfo",
  description: "Get info about guild.",
  aliases: ["server", "serverinfo", "guild", "ginfo", "sinfo"],
  usage: "guildinfo",
  example: "guildinfo"
}

exports.conf = {
  aliases: ["server", "serverinfo", "guild", "ginfo", "sinfo"],
  cooldown: 10
}