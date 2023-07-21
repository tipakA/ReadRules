import constants from '../util/constants';
import { Event } from '../util/interfaces';
import { getPermissions } from '../util/util';
import { Message } from 'discord.js';
import ReadRulesClient from '../index';

function messageEvent(client: ReadRulesClient, message: Message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(constants.prefix)) return;

  const args = message.content.slice(constants.prefix.length).trim().split(/ +/);
  const cmd = args.shift()!.toLowerCase();

  const command = client.commands.get(cmd);
  if (!command) return;

  if (command.guildOnly && message.channel.type === 'DM') return message.channel.send('This command can only be used in guilds.');

  if (command.ownerOnly && message.author.id !== constants.ids.owner) {
    if (command.ownerSilentError) return;
    return message.reply('you do not have permissions to use this command.');
  }

  if (command.permissions.length && message.author.id !== constants.ids.owner) {
    const perms = getPermissions(message.member, command.permissions);
    if (perms.length) {
      return message.channel.send([
        'You do not have all permissions required to use this command.',
        `Missing: ${perms.map(perm => `\`${perm}\``).join(', ')}`,
      ].join('\n'));
    }
  }

  if (command.args && !args.length) return message.reply('this command requires args.');

  command.run(client, message, args);
}

const event: Event = {
  run: messageEvent,
  type: 'messageCreate',
};

export default event;
