const express = require('express');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('text', (ctx) => {
  ctx.reply('Привет');
});

bot.launch();

const app = express();

// Порт, на котором сервер будет слушать запросы
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Бот работает!');
});

// Запуск сервера Express
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
