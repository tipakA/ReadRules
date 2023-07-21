/* eslint-disable no-inline-comments */
import { Message, MessageAttachment } from 'discord.js';
import { Command } from '../util/interfaces';
import { inspect } from 'util';
import ReadRulesClient from '../index';

const Discord = require('discord.js'); // eslint-disable-line no-unused-vars

async function clear(client: ReadRulesClient, input: any) {
  if (input?.constructor.name === 'Promise') input = await input; /* eslint-disable-line no-param-reassign */

  return inspect(input, { depth: 0 })
    .replace(/`/g, '`\u200b')
    .replace(/@/g, '`\u200b')
    .replace(client.token!, '👌😂💯😂😂💯😂👌😂💯💯👌');
}

async function evalCommand(client: ReadRulesClient, message: Message, args: string[]) {
  const code = args.join(' ');
  let ret = message; // Promise<Message> afterall

  try {
    const evaled = eval(code);
    const cleaned = await clear(client, evaled);
    const wrapped = `\`\`\`js\n${cleaned}\`\`\``;

    if (wrapped.length <= 2000) await message.channel.send(wrapped);
    else {
      const file = new MessageAttachment(Buffer.from(cleaned), 'out.js');
      ret = await message.channel.send({ files: [file] });
    }

  } catch (err) {
    const cleaned = await clear(client, err);
    const wrapped = `\`\`\`js\n${cleaned}\`\`\``;

    if (wrapped.length <= 2000) await message.channel.send(wrapped);
    else {
      const file = new MessageAttachment(Buffer.from(cleaned), 'out.js');
      ret = await message.channel.send({ files: [file] });
    }
  }

  return ret;
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
