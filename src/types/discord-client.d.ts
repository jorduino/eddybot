import type { Collection } from "discord.js";
import type { Command } from "../path/to/your/command-type-file";

declare module "discord.js" {
	interface Client {
		commands: Collection<string, Command>;
	}
}
