import { Command } from '../util/interfaces';
import { inspect } from 'util';
import { Message } from 'discord.js';
import ReadRulesClient from '../index';

const Discord = require('discord.js'); // eslint-disable-line no-unused-vars

async function clear(client: ReadRulesClient, input: any) {
  if (input?.constructor.name === 'Promise') input = await input; /* eslint-disable-line no-param-reassign */

  return inspect(input, { depth: 0 })
    .replace(/`/g, '`\u200b')
    .replace(/@/g, '`\u200b')
    .replace(client.token!, '👌😂💯😂😂💯😂👌😂💯💯👌');
}

async function evalCommand(message: Message, args: string[]): Promise<Message> {
  const client = message.client; // eslint-disable-line no-unused-vars
  const code = args.join(' ');
  let cleaned;
  try {
    const evaled = eval(code);
    cleaned = await clear(message.client as ReadRulesClient, evaled);
  } catch (err) {
    cleaned = await clear(message.client as ReadRulesClient, err);
  }
  return message.channel.send(cleaned, { code: 'js' }).catch(() => message);
}

/* eslint-disable sort-keys */
export const command: Command = {
  run: evalCommand,
  name: 'eval',
  guildOnly: false,
  args: false,
  aliases: [],
  category: 'Hidden',
  ownerOnly: true,
  ownerSilentError: true,
  permissions: [],
};

export default command;