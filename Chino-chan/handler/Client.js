const {Client, Collection} = require("discord.js"), config = require('../config.json')

module.exports = class TutorialBot extends Client {
  constructor(options) {
    super(options)
    
    this.commands = new Collection(); // This will store your commands.
    this.cooldowns = new Collection(); // This will store your commands with cooldowns.
    this.aliases = new Collection(); // This will store your alternative commands. Example: /server -> /serverinfo, /guild, /guildinfo
    this.config = require('../config.json');
    this.colors = config.colors
    this.package = require("../package.json");
    this.recent = new Set();
    this.snipes = new Collection()
    this.esnipes = new Collection()
    
  }
}