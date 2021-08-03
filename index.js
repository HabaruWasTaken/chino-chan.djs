const Discord = require('discord.js');
const tutorialBot = require('./handler/Client.js');
const client = new tutorialBot();
const keepAlive = require('./server.js')

require('./handler/Module.js')(client);
require('./handler/Event.js')(client);
require('dotenv').config();

client.on('warn', console.warn);

client.on('error', console.error)

keepAlive()
client.login(process.env.TOKEN).catch(console.error);