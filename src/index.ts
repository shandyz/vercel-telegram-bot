import { Telegraf, Markup } from 'telegraf';
import { link } from 'telegraf/format';

import { about } from './commands';
import { greeting, description } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const WEB_APP_URL = 'https://t.me/MinersGamezBot/andys';

const gameShortName = 'MinersGame';
// const gameUrl = 'http://telegame.free.nf/index.html';
const gameUrl = 'https://play.famobi.com/wrapper/garden-bloom/A1000-10';

const markup = Markup.inlineKeyboard([
  Markup.button.game('🎮 Play now!'),
  Markup.button.url('Help', 'http://google.com'),
]);

const bot = new Telegraf(BOT_TOKEN);

// bot.start((ctx) => ctx.replyWithGame(gameShortName));
bot.start((ctx) => ctx.reply(gameShortName + ' started!'));
bot.command('html', (ctx) => ctx.replyWithHTML('<b>bar</b>'));
bot.command('play', (ctx) => ctx.replyWithGame(gameShortName, markup));
bot.gameQuery((ctx) => ctx.answerGameQuery(gameUrl));
bot.command('play', (ctx) => ctx.replyWithGame(gameShortName, markup));
bot.command('game', (ctx) =>
  ctx.reply(
    link('Launch', 'https://t.me/MinersGamezBot/andys?startapp=launch'),
  ),
);

bot.command('keyboard', (ctx) =>
  ctx.reply(
    'Launch mini app from keyboard!',
    Markup.keyboard([Markup.button.webApp('Launch', WEB_APP_URL)]).resize(),
  ),
);

bot.command('startgame', (ctx) => {
  ctx.reply('Click the button below to play the game:', {
    reply_markup: {
      inline_keyboard: [[{ text: 'Play Game', url: gameUrl }]],
    },
  });
});

bot.command('about', about());
bot.command('desc', description());

// bot.command('desc', description());
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.hears('fuck', (ctx) => ctx.reply('Fuck you too'));

// bot.on('message', greeting());

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
