import log from "@/utils/log";
import { EventConfiguration, EventHandler } from "../types/generics";

export const config: EventConfiguration = {
  enabled: true,
}

// You can check which arguments are available by uncommenting the following line and hovering over the word `func`
// const func: ClientEvents['guildMemberUpdate'] = [];
// Change 'guildMemberUpdate' to whatever event you want and you'll see the available arguments.
// The arguments will be used in the function below such as (client, ...args) => {}, in this case (client, oldMember, newMember)

const handler: EventHandler<'guildMemberUpdate'> = async (client, oldMember, newMember) => {
  log('debug', `Member ${newMember.user.tag} (${newMember.id}) updated in ${newMember.guild.name} (${newMember.guild.id})`);
}
export default handler;