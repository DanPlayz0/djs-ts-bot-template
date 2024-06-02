import { ChatInputApplicationCommandData, ChatInputCommandInteraction, ClientEvents, MessageApplicationCommandData, MessageContextMenuCommandInteraction, UserApplicationCommandData, UserContextMenuCommandInteraction } from "discord.js"
import { FakeClient } from "./client";

export { ApplicationCommandOptionType as CommandOptionType } from "discord.js";

// Events
export interface EventConfiguration {
  event?: keyof ClientEvents; // Defaults to file name
  enabled?: boolean; // Defaults to true
  once?: boolean;
}
export type EventHandler<Event extends keyof ClientEvents> = (client: FakeClient<true>, ...args: ClientEvents[Event]) => void; 
export interface EventFile {
  config?: EventConfiguration;
  default: EventHandler<any>;
}

// Commands
export type CustomApplicationCommandResolvable = Omit<ChatInputApplicationCommandData, 'name'> & ({ name?: string });
export interface CommandConfiguration {
  name?: string; // Defaults to file name
  enabled?: boolean; // Defaults to true
  command: CustomApplicationCommandResolvable;
}
export type CommandHandler = (context: { client: FakeClient<true>, interaction: ChatInputCommandInteraction }) => void;
export interface CommandFile {
  config: CommandConfiguration;
  default: CommandHandler;
}

// Message Context Menu Commands
export type MessageContextCommandResolvable = Omit<MessageApplicationCommandData, 'name' | 'type'> & ({ name?: string });
export interface MessageContextCommandConfiguration {
  name?: string; // Defaults to file name
  enabled?: boolean; // Defaults to true
  menu: MessageContextCommandResolvable;
}
export type MessageContextCommandHandler = (context: { client: FakeClient<true>, interaction: MessageContextMenuCommandInteraction }) => void;
export interface MessageContextCommandFile {
  config: MessageContextCommandConfiguration;
  default: MessageContextCommandHandler;
}

// User Context Menu Commands
export type UserContextCommandResolvable = Omit<UserApplicationCommandData, 'name' | 'type'> & ({ name?: string });
export interface UserContextCommandConfiguration {
  name: string; // Defaults to file name
  enabled?: boolean; // Defaults to true
  menu: UserContextCommandResolvable;
}
export type UserContextCommandHandler = (context: { client: FakeClient<true>, interaction: UserContextMenuCommandInteraction }) => void;
export interface UserContextCommandFile {
  config: UserContextCommandConfiguration;
  default: UserContextCommandHandler;
}