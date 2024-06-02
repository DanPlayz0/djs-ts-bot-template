import { ClientEvents } from "discord.js";
import { EventConfiguration, EventHandler } from "@/types/generics";
import log from "@/utils/log";

export const config: EventConfiguration = {
  enabled: true,
}

// You can check which arguments are available by uncommenting the following line and hovering over the word `func`
// const func: ClientEvents['guildCreate'] = [];
// Change 'guildCreate' to whatever event you want and you'll see the available arguments.
// The arguments will be used in the function below such as (client, ...args) => {}, in this case (client, guild)

const handler: EventHandler<'guildCreate'> = async (client, guild) => {
  log('debug', `Joined ${guild.name} (${guild.id})`);
}
export default handler;