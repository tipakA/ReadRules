import constants from '../util/constants';
import { Event } from '../util/interfaces';
import ReadRulesClient from '../index';
import { TextChannel } from 'discord.js';

async function readyEvent(client: ReadRulesClient) {
  console.log(`Logged in as ${client.user!.tag}`);

  const rulesChannel = client.channels.cache.get(constants.ids.gating.rulesChannel) as TextChannel | undefined;
  if (!rulesChannel) return console.error('No rulesChannel found!');

  const logChannel = client.channels.cache.get(constants.ids.userlogChannel) as TextChannel;
  client.logChannel = logChannel ?? null;
  if (!client.logChannel) console.error('No userlogChannel found!');

  await rulesChannel.messages.fetch(constants.ids.gating.rulesMessage);
}

const event: Event = {
  run: readyEvent,
  type: 'ready',
};

export default event;