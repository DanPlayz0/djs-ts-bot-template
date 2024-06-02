import { ApplicationCommandType, ChatInputCommandInteraction, InteractionType, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";
import { EventConfiguration, EventHandler } from "../types/generics";

export const config: EventConfiguration = {
  enabled: true,
}

const handler: EventHandler<'interactionCreate'> = (client, interaction) => {
  if (interaction.type == InteractionType.ApplicationCommand) {
    if (interaction.commandType == ApplicationCommandType.ChatInput) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      command.default({ client, interaction: interaction as ChatInputCommandInteraction });
      return;
    } else if (interaction.commandType == ApplicationCommandType.Message) {
      const command = client.messageContextMenus.get(interaction.commandName);
      if (!command) return;
      command.default({ client, interaction: interaction as MessageContextMenuCommandInteraction });
      return;
    } else if (interaction.commandType == ApplicationCommandType.User) {
      const command = client.userContextMenus.get(interaction.commandName);
      if (!command) return;
      command.default({ client, interaction: interaction as UserContextMenuCommandInteraction });
      return;
    }
    return;
  }
  if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
    // TODO: Implement autocomplete
    return;
  }
  if (interaction.type == InteractionType.MessageComponent) {
    // TODO: Implement message components
    return;
  }
  if (interaction.type == InteractionType.ModalSubmit) {
    // TODO: Implement modals
    return;
  }
}

export default handler;