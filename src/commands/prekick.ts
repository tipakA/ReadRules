import { Command } from '../util/interfaces';
import constants from '../util/constants';
import { Message } from 'discord.js';

async function prekickCommand(message: Message, args: string[]): Promise<Message> {
  const time = constants.kicking.kickTimeInHours * 3600 * 1000;
  const count = message.guild!.memberCount;
  const cachedCount = message.guild!.members.cache.size;
  const date = new Date(Date.now() - time);
  let fetched = false;

  const members = message.guild!.roles.cache.get(constants.ids.gating.joinRole)?.members;
  if (!members) throw '[COMMAND][PREKICK] Couldn\'t get the Joined role members.';

  if (count !== cachedCount) {
    await message.guild!.members.fetch();
    fetched = true;
  }

  const tooLongCount = members.filter(member => date >= member.joinedAt!).size;
  const output = fetched ?
    `Fetched (${cachedCount} => ${count}, ${tooLongCount})` :
    `OK (${cachedCount}, ${tooLongCount})`;

  return message.channel.send(output);
}

/* eslint-disable sort-keys */
const command: Command = {
  run: prekickCommand,
  name: 'prekick',
  guildOnly: true,
  args: false,
  aliases: [],
  category: 'Gating Utility',
  ownerOnly: true,
  permissions: [],
};

export default command;