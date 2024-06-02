import { EmbedBuilder } from "discord.js";
import { CommandConfiguration, CommandHandler } from "../types/generics";

export const config: CommandConfiguration = {
  enabled: true,
  command: {
    description: 'Get the bot\'s ping.',
  }
}

const handler: CommandHandler = async ({ client, interaction }) => {
  const startTime = Date.now();
  await interaction.deferReply();
  const editTime = Date.now();

  interaction.editReply({ embeds: [
    new EmbedBuilder()
      .setColor("Green")
      .setDescription(`**Latency:** \`${Math.round(client.ws.ping)}ms\`\n**Edit Time:** \`${editTime - startTime}ms\`\n**Uptime:** <t:${Math.floor(Date.now()-(process.uptime() * 1000))}:R>`)
    ]
  });
}
export default handler;