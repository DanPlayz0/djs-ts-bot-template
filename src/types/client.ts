import { Client, ClientOptions, Collection } from "discord.js";
import { MessageContextCommandFile, CommandFile, UserContextCommandFile } from "./generics";

export class FakeClient<Ready extends boolean = boolean> extends Client<Ready> {
  commands: Collection<string, CommandFile>;
  messageContextMenus: Collection<string, MessageContextCommandFile>;
  userContextMenus: Collection<string, UserContextCommandFile>;
  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.messageContextMenus = new Collection();
    this.userContextMenus = new Collection();
  }
}