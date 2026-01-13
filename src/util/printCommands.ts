import { InteractionContextType, type RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
import treeify from "object-treeify";

export default (commandJSONList: RESTPostAPIApplicationCommandsJSONBody[]) => {
	const commandList = Object.fromEntries(
		commandJSONList.map(commandJSON => {
			// set guildOnly = true if the command's ONLY context is guild
			const guildOnly =
				commandJSON.contexts?.length === 1 &&
				commandJSON.contexts[0] === InteractionContextType.Guild;

			return [commandJSON.name, guildOnly ? "(guild only)" : null];
		}),
	);

	return "Successfully registered these commands:\n" + treeify(commandList);
};
