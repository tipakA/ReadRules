import { MessageReaction, User } from 'discord.js';
import constants from '../util/constants';
import { Event } from '../util/interfaces';
import ReadRulesClient from '../index';
import { removeRecent } from '../util/util';

async function messageReactionAddEvent(client: ReadRulesClient, reaction: MessageReaction, user: User) {
  if (reaction.message.guild?.id !== constants.ids.gating.guild) return;
  if (reaction.message.id !== constants.ids.gating.rulesMessage) return;
  if (constants.reactions.autoRemove) reaction.users.remove(user);
  if (client.recentReactions.has(user.id)) return;

  const emojis = constants.ids.gating.emoji.fail.concat(constants.ids.gating.emoji.pass);
  if (!emojis.includes(reaction.emoji.name)) return;

  const member = await reaction.message.guild!.members.fetch(user).catch(console.error);
  if (!member) return console.error('Member who reacted could not be fetched!');

  client.recentReactions.add(user.id);
  client.setTimeout(removeRecent, constants.reactions.cooldown, client, user.id);

  const time = Date.now() - member.joinedTimestamp!;
  const seconds = time / 1000;
  const minutes = seconds / 60;

  let after: string;
  if (minutes >= 60) after = `${(minutes / 60).toFixed(1)} hours`;
  else if (seconds >= 60) after = `${(seconds / 60).toFixed(1)} minutes`;
  else after = `${seconds.toFixed(1)} seconds`;

  if (constants.ids.gating.emoji.fail.includes(reaction.emoji.name)) {
    if (member.permissions.has('MANAGE_GUILD') || !member.kickable || member.user.id === constants.ids.owner) return;
    try {
      await user.send('Sorry, but you did not read the rules properly.');
    } catch {} finally { // eslint-disable-line no-empty
      await member.kick('failed the check');
      await client.logChannel?.send(`${user} failed to react with proper emote after \`${after}\`.`);
    }
  } else if (constants.ids.gating.emoji.pass.includes(reaction.emoji.name)) {
    await member.roles.remove(constants.ids.gating.joinRole);
    await client.logChannel?.send(`${user} unlocked access to the server after \`${after}\`.`);
  }
}

const event: Event = {
  run: messageReactionAddEvent,
  type: 'messageReactionAdd',
};

export default event;