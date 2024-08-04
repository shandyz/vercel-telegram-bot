import { Context } from 'telegraf';

const description = () => async (ctx: Context) => {
  const message = `Description`;
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

export { description };
