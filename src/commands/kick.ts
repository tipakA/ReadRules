import { Collection, GuildMember, Message } from 'discord.js';
import { Command } from '../util/interfaces';
import constants from '../util/constants';
import { wait } from '../util/util';

async function kickCommand(message: Message, args: string[]): Promise<Message> {
  if (message.guild?.id !== constants.ids.gating.guild) return message.channel.send('This command is restricted to a server that is not this one.');
  const time = constants.kicking.kickTimeInHours * 3600 * 1000;
  const delay = constants.kicking.delays.kick;

  const output: Array<string> = [];

  const members = message.guild!.roles.cache.get('758926599952924723')?.members;
  if (!members) throw '[COMMAND][KICK] Couldn\'t get Joined role members.';

  const date = new Date(Date.now() - time);
  const membersToKick = members.filter(member => date >= member.joinedAt!);

  let batch: Array<GuildMember>;
  if (membersToKick.size > constants.kicking.batchSize) batch = membersToKick.first(constants.kicking.batchSize);
  else batch = [...membersToKick.values()];

  let shouldWaitCounter = 1;
  let shouldWait = delay && shouldWaitCounter < batch.length;

  for (const member of batch.values()) {
    const timeDiff = Date.now() - member.joinedTimestamp!;
    const s = timeDiff / 1000;
    const m = s / 60;
    let timePassed: string;

    if (m >= 60) timePassed = `${(m / 60).toFixed(1)} h`;
    else if (s >= 60) timePassed = `${(s / 60).toFixed(1)} m`;
    else timePassed = `${s.toFixed(1)} s`;

    await member.send('You were kicked from `Bongo\'s Den` for inactivity.')
      .then(() => output.push(`${member.toString()} +DM; \`${timePassed}\``))
      .catch(() => output.push(`${member.toString()} -DM; \`${timePassed}\``));

    if (shouldWait) {
      shouldWait = ++shouldWaitCounter < batch.length;
      await wait(delay);
    }
  }

  if (output.length) {
    output.push(`Total: ${batch.length}`);
    return message.channel.send(output.join('\n'));
  }

  return message.channel.send('No one was kicked.');
}

/* eslint-disable sort-keys */
const command: Command = {
  run: kickCommand,
  name: 'kick',
  guildOnly: true,
  args: false,
  aliases: [],
  category: 'Gating Utility',
  ownerOnly: true,
  permissions: [],
};

export default command;