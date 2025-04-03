const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const conf = JSON.parse(fs.readFileSync('conf.json'));
const token = conf.key;
const bot = new TelegramBot(token, { polling: true });

let promemoria = {};

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const testo = msg.text.trim();

    if (testo === '/start') {
        bot.sendMessage(chatId, "Benvenuto! Usa /help per vedere i comandi disponibili.");
    } else if (testo === '/help') {
        bot.sendMessage(chatId, "Comandi disponibili:\n" +
            "- /add: aggiungi un'attività\n" +
            "- /list: visualizza le attività\n" +
            "- /delete: elimina un'attività\n" +
            "- /help: mostra questo messaggio");
    }