require('dotenv').config();

const express = require('express');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Настройка маршрута для Webhook
app.use(bot.webhookCallback('/webhook'));

// Запуск сервера и установка Webhook
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  const webhookUrl = `https://telegram-hello-bot-nmyd.vercel.app/webhook`;
  try {
    await bot.telegram.setWebhook(webhookUrl);
    console.log(`Webhook установлен на ${webhookUrl}`);
  } catch (error) {
    console.error('Ошибка при установке Webhook:', error);
  }
});
