import constants from '../util/constants';
import { Event } from '../util/interfaces';
import { Message } from 'discord.js';
import ReadRulesClient from '../index';

async function newRulesMessage(client: ReadRulesClient, message: Message) {
  if (!constants.reactions.autoReact) return;
  if (message.author.bot) return;
  if (message.channel.id !== constants.ids.gating.rulesChannel) return;

  const emojis = constants.ids.gating.emoji.fail.concat(constants.ids.gating.emoji.pass);
  for (const emote of emojis) await message.react(emote);
}

const event: Event = {
  run: newRulesMessage,
  type: 'messageCreate',
};

export default event;