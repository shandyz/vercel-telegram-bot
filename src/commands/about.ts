import { Context } from 'telegraf';
import createDebug from 'debug';

// import { author, name, version } from '../../package.json';
const name = 'miners-bot';
const author = 'test';
const debug = createDebug('bot:about_command');

const about = () => async (ctx: Context) => {
  const message = `*${name} *\nBy ${author}`;
  debug(`Triggered "about" command with message \n${message}`);
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { about };
