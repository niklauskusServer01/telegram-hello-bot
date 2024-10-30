const express = require('express');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Основной обработчик сообщений
bot.on('text', (ctx) => {
  ctx.reply('Привет');
});

// Настройка Webhook
app.use(bot.webhookCallback('/webhook'));

// Укажите Webhook для Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  
  // Установка Webhook
  const webhookUrl = `https://vercel.com/niklauskus-projects/telegram-hello-bot-nmyd`;
  await bot.telegram.setWebhook(webhookUrl);
  console.log(`Webhook установлен на ${webhookUrl}`);
});
