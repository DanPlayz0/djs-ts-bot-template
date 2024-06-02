import { UserContextCommandConfiguration, UserContextCommandHandler } from "@/types/generics";

export const config: UserContextCommandConfiguration = {
  enabled: true,
  name: 'User Info',
  menu: {}
}

const handler: UserContextCommandHandler = async ({ client, interaction }) => {
  interaction.reply({
    content: interaction.targetUser.tag,
    ephemeral: true,
  })
}
export default handler;