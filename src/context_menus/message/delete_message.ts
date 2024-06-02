import { MessageContextCommandConfiguration, MessageContextCommandHandler } from "@/types/generics";
import { EmbedBuilder } from 'discord.js';
import configuration from '@/config';

export const config: MessageContextCommandConfiguration = {
  enabled: true,
  name: 'Delete Message',
  menu: {}
}

const handler: MessageContextCommandHandler = async ({ client, interaction }) => {
  interaction.reply({ embeds: [new EmbedBuilder()
    .setColor("Green")
    .setDescription(`The message has been deleted!`)
  ], ephemeral: true });
}
export default handler;