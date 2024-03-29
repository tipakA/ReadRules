import { Command } from '../util/interfaces';
import { Message } from 'discord.js';
import ReadRulesClient from '..';

function pingCommand(client: ReadRulesClient, message: Message, args: string[]): Promise<Message> {
  return message.channel.send('Pong.');
}

/* eslint-disable sort-keys */
const command: Command = {
  run: pingCommand,
  name: 'ping',
  guildOnly: false,
  args: false,
  aliases: [],
  category: 'Bot Utility',
  ownerOnly: false,
  permissions: [],
};

export default command;
