import { Message, PermissionString, Snowflake } from 'discord.js';
import ReadRulesClient from '..';

export interface Command {
  run(message: Message, args: string[]): Message | Promise<Message>;
  name: string;
  aliases: string[];
  category: string;
  guildOnly: boolean;
  ownerOnly: boolean;
  ownerSilentError?: boolean;
  permissions: PermissionString[];
  args: boolean;
  disabled?: boolean;
  disabledIn?: Snowflake[];
  enabledIn?: Snowflake[];
}

export interface Event {
  run(client: ReadRulesClient, ...args: any[]): any;
  type: string;
}