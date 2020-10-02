import { MessageReaction, User } from 'discord.js';
import constants from '../util/constants';
import { Event } from '../util/interfaces';
import ReadRulesClient from '../index';

async function messageReactionAddEvent(client: ReadRulesClient, reaction: MessageReaction, user: User) {
  if (reaction.message.guild?.id !== constants.ids.gating.guild) return;

  if (reaction.emoji.name !== constants.ids.gating.emoji) return;
  if (reaction.message.id !== constants.ids.gating.rulesMessage) return;

  const member = await reaction.message.guild!.members.fetch(user);
  if (!member) return console.error('Member who reacted could not be fetched!');

  if (member.roles.cache.has(constants.ids.gating.joinRole)) {
    const time = Date.now() - member.joinedTimestamp!;
    const seconds = time / 1000;
    const minutes = seconds / 60;

    let after: string;
    if (minutes >= 60) after = `${(minutes / 60).toFixed(1)} hours`;
    else if (seconds >= 60) after = `${(seconds / 60).toFixed(1)} minutes`;
    else after = `${seconds.toFixed(1)} seconds`;

    await member.roles.remove(constants.ids.gating.joinRole);
    await client.logChannel?.send(`${user} unlocked access to the server after \`${after}\`.`);
  }
}

const event: Event = {
  run: messageReactionAddEvent,
  type: 'messageReactionAdd',
};

export default event;