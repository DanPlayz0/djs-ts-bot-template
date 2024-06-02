import { ApplicationCommandDataResolvable, ApplicationCommandType } from "discord.js";
import { EventConfiguration, EventHandler } from "@/types/generics";
import log from "@/utils/log";

export const config: EventConfiguration = {
  // name: 'ready', // This is the name of the event it listens for, so the file name doesn't need to match the event name.
  once: true, // This event should only be called once.
  enabled: true,
}

// The ready event gives you the client when it is ready as an argument, in this scenario (someArg)
// But we already provide a client object in the handler, so we don't need to use it.
const handler: EventHandler<'ready'> = async (client, someArg) => {
  log('ready', `Logged in as ${client.user.tag}`);

  // Anything below this will not run when ran in production mode.
  // if (process.env.NODE_ENV === 'production') return;
  // return;

  // Register commands
  await client.guilds.cache.get("733135938347073576")?.commands.set([
    ...client.commands.map(command => command.config.command),
    ...client.messageContextMenus.map(menu => ({ ...menu.config.menu, type: ApplicationCommandType.Message })),
    ...client.userContextMenus.map(menu => ({ ...menu.config.menu, type: ApplicationCommandType.User })),
  ] as ApplicationCommandDataResolvable[]);
  log('ready', 'Commands registered');
}
export default handler;