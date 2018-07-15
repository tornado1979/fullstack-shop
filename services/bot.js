/* import telegram-bot  */
const TelegramBot = require('node-telegram-bot-api');

// telegram token

const telegramTokenBotaki = '.......'; // api key of the created bot
// Create a bot that user 'polling' to fetch new updates
const bot = new TelegramBot(telegramTokenBotaki, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// when user writes command '/start'
bot.onText(/\/start/, function (msg, match) {
  var fromId = msg.from.id; // user id
  var name = msg.from.first_name;
  bot.sendMessage(fromId, `Welcome dear ${name} have fun`);
  bot.sendPhoto(fromId, 'https://www.freeiconspng.com/uploads/welcome-images-24.png');
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id; // chat id
  var fromId = msg.from.id; // user id

  // send a message to the chat acknowledging receipt of their message
  var Hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(msg.chat.id,"Καλώς ήρθες. Είμαι ο starbot.");
  }

  var yes = "yes";
  if(msg.text.toString().toLowerCase().includes(yes)) {
    bot.sendMessage(msg.chat.id, "hm...")
  }
  var no = "no";
  if(msg.text.toString().toLowerCase().includes(no)) {
    bot.sendMessage(msg.chat.id, `Χάρηκα για την γνωριμία, ${msg.from.first_name}:${msg.from.id}:${msg.chat.id}`)
  }

  var bye = "bye";
  if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, `Να ξαναρθείς,  ${msg.from.first_name}`);
    bot.sendPhoto(fromId, 'https://previews.123rf.com/images/dxinerz/dxinerz1509/dxinerz150901337/45612790-bye-goodbye-icon.jpg');
  }

  var id = "id";
  if (msg.text.toString().toLowerCase().indexOf(id) === 0) {
    bot.sendMessage(msg.chat.id, `Your id is :', ${msg.from.id}`)
  }
});

module.exports = bot;
