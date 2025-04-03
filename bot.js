const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const conf = JSON.parse(fs.readFileSync('conf.json'));
const token = conf.key;
const bot = new TelegramBot(token, { polling: true });

let promemoria = {};

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const testo = msg.text;

    if (testo === '/start') {
        bot.sendMessage(chatId, "Benvenuto! Usa /help per vedere i comandi disponibili.");
    } else if (testo === '/help') {
        bot.sendMessage(chatId, "Comandi disponibili:\n" +
            "- /add: aggiungi un'attività\n" +
            "- /list: visualizza le attività\n" +
            "- /delete: elimina un'attività\n" +
            "- /help: mostra questo messaggio");
    } else if (testo === '/add') {
        bot.sendMessage(chatId, "Inserisci l'attività nel formato: data, ora, nome (es. 2025-04-10, 14:30, Riunione)");
    } else if (testo.includes(",")) {
        const parti = testo.split(",");
        if (parti.length < 3) {
            bot.sendMessage(chatId, "Formato non valido. Usa: data, ora, nome");
            return;
        }
        
        const dataOra = parti[0] + " " + parti[1];
        const nome = parti.slice(2).join(" ");

        if (!promemoria[chatId]) {
            promemoria[chatId] = {};
        }

        promemoria[chatId][nome] = dataOra;
        bot.sendMessage(chatId, `Attività "${nome}" aggiunta.`);
    }
});
