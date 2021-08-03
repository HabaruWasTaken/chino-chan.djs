const Discord = require('discord.js'), moment = require('moment')
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

exports.run = async(client, message, args) => {

  function getMember(message, toFind = '') {
    toFind = toFind.toLowerCase();

    let target = message.guild.members.cache.get(toFind);

    if (!target && message.mentions.members)
      target = message.mentions.members.first();

    if (!target && toFind) {
      target = message.guild.members.cache.find(member => {
        return (
          member.displayName.toLowerCase().includes(toFind) ||
          member.user.tag.toLowerCase().includes(toFind)
        );
      });

      if (!target) {
        const fail = new Discord.MessageEmbed()
          .setColor(client.config.colors.error)
          .setTitle("Can't find that member!")
          .setDescription("Please use member's ID");
        return message.channel.send(fail);
      }
    }

    if (!toFind) target = message.member;

    return target;
  }

  function trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr.join(', ');
	}

  const member = getMember(message, args.join(" "))

  const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);

  const userFlags = member.user.flags.toArray();

  		const embed = new Discord.MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setColor(client.config.colors.theme)
			.addField('User', [
				`**❯ Username:** ${member.user.username}`,
				`**❯ Discriminator:** ${member.user.discriminator}`,
				`**❯ ID:** ${member.id}`,
				`**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				`**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
				`**❯ Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} \n(${moment(member.user.createdTimestamp).fromNow()})`,
				`**❯ Status:** ${member.user.presence.status}`,
				`**❯ Game:** ${member.user.presence.game || 'Not playing a game.'}`,
				`\u200b`
			])
			.addField('Member', [
				`**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
				`**❯ Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
				`**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
				`**❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? trimArray(roles) : 'None'}`,
				`\u200b`
			]);
		return message.channel.send(embed);

}

exports.help = {
  name: "userinfo",
  description: "Get info about user.",
  usage: "userinfo [tag/id/nickname]",
  aliases: ["user", "whois"],
  example: "userinfo @Habaru"
}

exports.conf = {
  aliases: ["user", "whois"],
  cooldown: 10
}