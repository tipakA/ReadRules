import { GuildMember, PermissionString, Snowflake } from 'discord.js';
import { promisify } from 'util';
import { readdir } from 'fs';
import ReadRulesClient from '../index';

export const ls = promisify(readdir);

export const wait = promisify(setTimeout);

export function getPermissions(member: GuildMember | null, permissions: PermissionString[]): PermissionString[] {
  if (!member) throw new Error('No member in getPermissions function');
  if (!permissions.length) return [];

  const missing = member.permissions.missing(permissions);
  return missing;
}

export function removeRecent(client: ReadRulesClient, id: Snowflake) {
  if (!client.recentReactions.has(id)) throw 'Queued ID was not in the Set!';
  return client.recentReactions.delete(id);
}