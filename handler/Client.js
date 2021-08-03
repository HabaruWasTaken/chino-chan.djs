const {Client, Collection} = require("discord.js"), config = require('../config.json'), db = require('quick.db')

module.exports = class TutorialBot extends Client {
  constructor(options) {
    super(options)
    
    this.commands = new Collection();
    this.cooldowns = new Collection()
    this.aliases = new Collection()
    this.config = require('../config.json');
    this.colors = config.colors
    this.package = require("../package.json");
    this.recent = new Set();
    this.snipes = new Collection()
    this.esnipes = new Collection()
    this.db = db
    
  }
}