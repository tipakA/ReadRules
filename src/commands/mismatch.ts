import { Command } from '../util/interfaces';
import { Collection, Message } from 'discord.js';
import ReadRulesClient from '..';
import { stripIndent } from 'common-tags';
import { inspect } from 'util';

async function mismatchCommand(client: ReadRulesClient, message: Message, args: string[]): Promise<Message> {
  if (!message.guild) throw 'not possible';

  const oldCounts = [ message.guild.memberCount, message.guild.members.cache.size ];
  if (oldCounts[0] === oldCounts[1]) return message.reply({ content: `\`\`\`No mismatch. ${oldCounts[0]} / ${oldCounts[1]}\`\`\``, allowedMentions: { repliedUser: false }});

  if (args.some(arg => [ '-c', '--clear' ].includes(arg))) {
    client.mismatch.oldCollection.clear();
    client.mismatch.newCollection.clear();
    client.mismatch.difference.clear();

    return message.channel.send({ content: 'Cleared.' });
  }

  client.mismatch.oldCollection = new Collection(message.guild.members.cache.entries());
  client.mismatch.newCollection = await message.guild.members.fetch();
  client.mismatch.difference = client.mismatch.oldCollection.difference(client.mismatch.newCollection);

  const minusOnePlusOne = oldCounts[0] > oldCounts[1] ? 'missing' : 'still cached';
  const niceLookingCollection = inspect(client.mismatch.difference, { depth: 0 });

  const content = stripIndent`
    Old counts: \`memberCount\` / \`cache.size\` => \`${oldCounts[0]}\` / \`${oldCounts[1]}\`
    Collection sizes: old / new => \`${client.mismatch.oldCollection.size}\` / \`${client.mismatch.newCollection.size}\`
    Difference (${minusOnePlusOne}):
    \`\`\`js
    ${niceLookingCollection}
    \`\`\`
    `;
  
  return message.reply({ content, allowedMentions: { repliedUser: false }});
}

/* eslint-disable sort-keys */
const command: Command = {
  run: mismatchCommand,
  name: 'mismatch',
  guildOnly: true,
  args: false,
  aliases: [],
  category: 'Bot Utility',
  ownerOnly: true,
  permissions: [],
};

export default command;
