import constants from '../util/constants';
import { Event } from '../util/interfaces';
import { GuildMember } from 'discord.js';
import ReadRulesClient from '../index';

function guildMemberAddEvent(client: ReadRulesClient, member: GuildMember) {
  if (member.guild.id !== constants.ids.gating.guild) return;
  member.roles.add(constants.ids.gating.joinRole);
}

const event: Event = {
  run: guildMemberAddEvent,
  type: 'guildMemberAdd',
};

export default event;