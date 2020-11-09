import { Client, Collection, Snowflake, TextChannel } from 'discord.js';
import { Command, Event } from './util/interfaces';
import { ls } from './util/util';
require('dotenv').config();

export default class ReadRulesClient extends Client {
  public constructor() {
    super({
      messageCacheMaxSize: 20,
      // All intents
      ws: { intents: 32767 },
    });
  }

  #logChannel: TextChannel | null = null;
  #commands = new Collection<string, Command>();
  #recentReactions = new Set<Snowflake>();

  public get commands() {
    return this.#commands;
  }

  public get recentReactions() {
    return this.#recentReactions;
  }

  public get version(): string {
    const p = require('../../package.json'); // eslint-disable-line global-require
    return p.version;
  }

  public get logChannel() {
    return this.#logChannel;
  }

  public set logChannel(channel: TextChannel | null) {
    this.#logChannel = channel;
  }

  private async _init() {
    console.log('Initializing...');

    const cmdFiles = await ls(`${__dirname}/commands`).then(d => d.filter(f => f.endsWith('.js')));
    console.log(`Loading ${cmdFiles.length} commands...`);
    for (const file of cmdFiles) {
      const name = file.split('.')[0];
      const command: Command = require(`${__dirname}/commands/${name}.js`).default; // eslint-disable-line global-require

      this.commands.set(command.name, command);
    }

    const evtFiles = await ls(`${__dirname}/events`).then(d => d.filter(f => f.endsWith('.js')));
    console.log(`Loading ${evtFiles.length} events...`);
    for (const file of evtFiles) {
      const name = file.split('.')[0];
      const event: Event = require(`${__dirname}/events/${name}.js`).default; // eslint-disable-line global-require

      this.on(event.type, event.run.bind(null, this));
    }
  }

  public async start() {
    await this._init();
    return this.login(process.env.TOKEN);
  }
}

const client = new ReadRulesClient();
client.start();