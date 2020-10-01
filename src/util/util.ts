import { GuildMember, PermissionString } from 'discord.js';
import { promisify } from 'util';
import { readdir } from 'fs';

export const ls = promisify(readdir);

export const wait = promisify(setTimeout);

export function getPermissions(member: GuildMember | null, permissions: PermissionString[]): PermissionString[] {
  if (!member) throw new Error('No member in getPermissions function');
  if (!permissions.length) return [];

  const missing = member.permissions.missing(permissions);
  return missing;
}