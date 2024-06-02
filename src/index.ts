process.chdir(__dirname); // This is so that the paths are relative to the src folder (and build folder respectively), aka for the fs module & .env file
import 'dotenv/config';
import { ActivityType, ClientEvents, GatewayIntentBits, Events } from 'discord.js';
import indexFolder from '@/utils/indexFolder';
import config from '@/config';
import { CommandConfiguration, CommandFile, EventConfiguration, EventFile, MessageContextCommandConfiguration, MessageContextCommandFile, UserContextCommandConfiguration, UserContextCommandFile } from '@/types/generics';
import { sep } from 'path';
import { FakeClient } from '@/types/client';
import connect from './database/connect';
import log from '@/utils/log';

(async () => {
  // Connect to the database before anything else (so we can use it in the event handlers)
  const mongoConnected = await connect();
  if (!mongoConnected) return;

  // FakeClient is a custom class that extends the discord.js Client class.
  // It is used to add custom properties to the client object. (Like client.commands in this case.) 
  // Typescript sort of breaks if you don't use a class as then the type doesn't get extended properly.
  const client = new FakeClient({
    // The 'as' keyword is used to cast the value to the correct type. As it does not understand what type Object.values() will return.
    intents: Object.values(GatewayIntentBits) as GatewayIntentBits[], // This is a hacky way to get all intents, but it works.
    presence: {
      activities: [
        {
          type: ActivityType.Custom,
          name: 'The Automated Manager'
        }
      ]
    }
  });

  // Handlers
  const eventDir = await indexFolder('./events');
  const validEvents = Object.values(Events).map(event => event as keyof ClientEvents);
  for (const eventFile of eventDir) {
    if (eventFile.directory) continue; // We don't care about directories.
    const event: EventFile = await import("." + sep + eventFile.path + sep + eventFile.name);
    if (!event.default) throw new Error(`Event file "${eventFile.path}" does not have a default export.`); // Ensure there is a exported run function.
    if (event.config?.enabled == false) continue; // Skip disabled events.

    if (!event.config) event.config = {} as EventConfiguration; // Default to an empty object if not exported.
    if (!event.config?.event) event.config.event = eventFile.name.split('.')[0] as keyof ClientEvents; // Default to the file name if not specified.
    if (!validEvents.includes(event.config.event)) continue; // Ensure the event is valid.

    log('debug', `Loaded${event.config.once ? ' singular' : ''} event: ${event.config.event}`);
    client[event.config.once ? 'once' : 'on'](event.config.event, (...args) => event.default(client as FakeClient<true>, ...args));
  }

  const commandDir = await indexFolder('./commands');
  for (const commandFile of commandDir) {
    if (commandFile.directory) continue; // We don't care about directories.
    const command: CommandFile = await import("." + sep + commandFile.path + sep + commandFile.name);

    if (!command.default) throw new Error(`Command file "${commandFile.path}" does not have a default export.`); // Ensure there is a exported run function.
    if (!command.config) command.config = { command: {} } as CommandConfiguration; // Default to an empty object if not exported.

    if (command.config?.enabled == false) continue;
    if (!command.config.name) command.config.name = commandFile.name.split('.')[0];
    command.config.command.name = command.config.name; // Force discord deployable name to be the same as the (configuration or file) name.

    log('debug', `Loaded command: ${command.config.name}`);
    client.commands.set(command.config.name, command);
  }

  const messageContextMenuDir = await indexFolder('./context_menus/message');
  for (const contextFile of messageContextMenuDir) {
    if (contextFile.directory) continue; // We don't care about directories.
    const contextMenu: MessageContextCommandFile = await import("." + sep + contextFile.path + sep + contextFile.name);

    if (!contextMenu.default) throw new Error(`Message Context Menu file "${contextFile.path}" does not have a default export.`); // Ensure there is a exported run function.
    if (!contextMenu.config) contextMenu.config = { menu: {} } as MessageContextCommandConfiguration; // Default to an empty object if not exported.

    if (contextMenu.config?.enabled == false) continue;
    if (!contextMenu.config.name) contextMenu.config.name = contextFile.name.split('.')[0];
    contextMenu.config.menu.name = contextMenu.config.name; // Force discord deployable name to be the same as the (configuration or file) name.

    log('debug', `Loaded message context menu: ${contextMenu.config.name}`);
    client.messageContextMenus.set(contextMenu.config.name, contextMenu);
  }

  const userContextMenuDir = await indexFolder('./context_menus/user');
  for (const contextFile of userContextMenuDir) {
    if (contextFile.directory) continue; // We don't care about directories.
    const contextMenu: UserContextCommandFile = await import("." + sep + contextFile.path + sep + contextFile.name);

    if (!contextMenu.default) throw new Error(`User Context Menu file "${contextFile.path}" does not have a default export.`); // Ensure there is a exported run function.
    if (!contextMenu.config) contextMenu.config = { menu: {} } as UserContextCommandConfiguration; // Default to an empty object if not exported.

    if (contextMenu.config?.enabled == false) continue;
    if (!contextMenu.config.name) contextMenu.config.name = contextFile.name.split('.')[0];
    contextMenu.config.menu.name = contextMenu.config.name; // Force discord deployable name to be the same as the (configuration or file) name.

    log('debug', `Loaded user context menu: ${contextMenu.config.name}`);
    client.userContextMenus.set(contextMenu.config.name, contextMenu);
  }

  client.login(config.token);
})();