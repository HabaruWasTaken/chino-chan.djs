const Discord = require('discord.js');
const Captcha = require('@haileybot/captcha-generator');
const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');
const rarities = require('./rarities.json');
var cards = require('./gacha_card.json');

function pickRandom() {
  // Calculate chances for common
  var filler =
    100 - rarities.map(r => r.chance).reduce((sum, current) => sum + current);

  if (filler <= 0) {
    console.log('chances sum is higher than 100!');
    return;
  }

  var probability = rarities
    .map((r, i) => Array(r.chance === 0 ? filler : r.chance).fill(i))
    .reduce((c, v) => c.concat(v), []);

  var pIndex = Math.floor(Math.random() * 100);
  var rarity = rarities[probability[pIndex]];

  var rarit = rarity.type;

  var rarityVar;
  if (rarit == 'Tier: 1') {
    cards = require('./gacha_card.json').T1;
  } else if (rarit == 'Tier: 2') {
    cards = require('./gacha_card.json').T2;
  } else if (rarit == 'Tier: 3') {
    cards = require('./gacha_card.json').T3;
  } else if (rarit == 'Tier: 4') {
    cards = require('./gacha_card.json').T4;
  } else if (rarit == 'Tier: 5') {
    cards = require('./gacha_card.json').T5;
  }

  const Card = cards[Math.floor(Math.random() * cards.length)] + '~' + rarit;

  return Card;
}

function randomCardCode(db) {
  const a = db

  function randomChar(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  let randomCode = randomChar(6)
  let text = []
  for (i in a) {
    text.push(a[i].code)
  }
  if (text.includes(randomCode)) {
    randomCode = randomChar(6)
  }
  return randomCode
}

exports.run = async (client, message, args) => {

  const captcha = new Captcha();
  const theDatas = pickRandom().toString();

  const theData = `${theDatas}`;
  const theName = theData.split(`~`)[0];
  const theUrl = theData.split('~')[1];
  const theTier = theData.split('~')[2];

  captcha.PNGStream.pipe(
    fs.createWriteStream(path.join(__dirname, 'captcha.png'))
  );

  const Thecaptcha = captcha.value.toLowerCase();

  const canvas = Canvas.createCanvas(720, 1186);
  const ctx = canvas.getContext('2d');

  const card = await Canvas.loadImage(theUrl);

  ctx.drawImage(card, 0, 0, canvas.width, 926);

  const capt = await Canvas.loadImage(path.join(__dirname, './captcha.png'));

  ctx.drawImage(capt, 50, 877, 620, 260);

  const b = new Discord.MessageAttachment(canvas.toBuffer(), 'card.png');

  const embedA = new Discord.MessageEmbed()
    .setTitle(`${theName + ' ' + theTier}`)
    .setDescription(
      `[Card](${theUrl})\nTo claim the card, use: \`claim [captcha]\`.`
    )
    .setImage('attachment://card.png')
    .setColor(client.colors.theme);


  const codePath = "apathCodeCard"

  const cardPathInv = `a${message.author.id}.inv`

  const cardPath = `acard`

  const issuePath = `a${theName}.issue`

  var issue = client.db.get(issuePath)

  if (issue == null) {
    client.db.add(issuePath, 1)
    issue = client.db.get(issuePath)
  }

  var claimedPath = `a${message.author.id}.user.claimed`

  const cardCode = randomCardCode()




  try {
    const msg = await message.channel.send({ embed: embedA, files: [b] });

    try {
      const filter = m => {
        if (m.author.bot) return;

        if (m.content.slice(5).trim().split(/ +/g).shift().toLowerCase() == Thecaptcha) {

          return true
        } else {
          return false
        }
      };

      const res = await msg.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      });
      if (res) {
        console.log(res)
        const theAu = res.get(msg.channel.lastMessageID).author.id;
        const claimed = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setDescription(
            `<@${theAu}> got the card! \`${theName}\` issue: \`${issue}\`.`
          );

        const dataCard = {
          code: cardCode, data: [
            { name: theName, tier: theTier.split(" ")[1], issue: issue, image: theUrl, owner: theAu }
          ]
        }

        client.db.add(issuePath, 1)
        client.db.add(claimedPath, 1)

        client.db.push(cardPathInv, dataCard)
        client.db.push(cardPath, dataCard)

        msg.channel.send(claimed);
      }
    } catch (err) {
      console.log(err)
      await msg.delete();
      await msg.channel.send('No one get the card.').then(m =>
        setTimeout(() => {
          m.delete();
        }, 5000)
      );
    }
  } catch (err) {
    console.log(err);
  }

  fs.unlink(path.join(__dirname, 'captcha.png'), function() { });


};

exports.help = {
  name: 'test'
};

exports.conf = {
  aliases: [],
  cooldown: 10
};
