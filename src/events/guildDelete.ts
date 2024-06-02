import { ClientEvents } from "discord.js";
import { EventConfiguration, EventHandler } from "@/types/generics";
import log from "@/utils/log";

export const config: EventConfiguration = {
  enabled: true,
}

const handler: EventHandler<'guildDelete'> = async (client, guild) => {
  log('debug', `Left ${guild.name} (${guild.id})`);
}
export default handler;