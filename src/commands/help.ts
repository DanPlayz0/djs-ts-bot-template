import { EmbedBuilder } from "discord.js";
import { CommandConfiguration, CommandHandler } from "../types/generics";

export const config: CommandConfiguration = {
  enabled: true,
  command: {
    description: 'Get help with the bot\'s commands.',
  }
}

const handler: CommandHandler = ({ client, interaction }) => {
  interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ extension: 'png' }) })
        .setColor('Blurple')
        .setDescription(client.commands.map(command => `**${command.config.command.name}** - ${command.config.command.description}`).join('\n'))
        .setTimestamp()
    ]
  })
}
export default handler;