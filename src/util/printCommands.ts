import type { RESTPostAPIApplicationCommandsJSONBody } from "discord.js";

export default (commandJSONList: RESTPostAPIApplicationCommandsJSONBody[]) => {
	let commandList: string[] = [];
	commandJSONList.forEach(commandJSON => {
		commandList.push(commandJSON.name);
	});
	return "Successfully registered these\n" + commandList.join("\n");
};
