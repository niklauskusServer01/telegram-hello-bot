require('dotenv').config();  // Подключение dotenv для работы с переменными окружения

const express = require('express');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Middleware для обработки JSON-запросов
app.use(express.json());

// Основной обработчик сообщений от Telegram
bot.on('text', (ctx) => {
  console.log('Получено сообщение от пользователя:', ctx.message.text);  // Отладочное сообщение
  ctx.reply('Привет');  // Ответ на любое сообщение "Привет"
});

// Настройка маршрута для Webhook
app.use(bot.webhookCallback('/webhook'));

// Обработчик маршрута /webhook для отладки
app.post('/webhook', (req, res) => {
  console.log('Получен запрос от Telegram:', req.body);  // Вывод запроса в логах для отладки
  res.sendStatus(200);  // Подтверждаем получение запроса
});

// Запуск сервера и установка Webhook
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  const webhookUrl = `https://telegram-hello-bot-nmyd.vercel.app/webhook`;  // Укажите ваш Production URL

  try {
    await bot.telegram.setWebhook(webhookUrl);
    console.log(`Webhook установлен на ${webhookUrl}`);
  } catch (error) {
    console.error('Ошибка при установке Webhook:', error);
  }
});
