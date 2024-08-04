import { Telegraf, Markup } from 'telegraf';

import { about } from './commands';
import { greeting, description } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const gameShortName = 'Test-game';
const gameUrl = 'https://telegame.free.nf/index.html';

const markup = Markup.inlineKeyboard([
  Markup.button.game('🎮 Play now!'),
  Markup.button.url('Telegraf help', 'http://telegraf.js.org'),
]);

const bot = new Telegraf(BOT_TOKEN);

// bot.start((ctx) => ctx.replyWithGame(gameShortName));
bot.start((ctx) => ctx.reply(gameShortName));
bot.command('foo', (ctx) => ctx.replyWithGame(gameShortName, markup));
bot.gameQuery((ctx) => ctx.answerGameQuery(gameUrl));

bot.command('about', about());
bot.command('desc', about());

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
