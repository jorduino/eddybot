# Eddybot

[![Tests](https://github.com/jorduino/eddybot/actions/workflows/tests.yml/badge.svg)](https://github.com/jorduino/eddybot/actions/workflows/tests.yml)

## About

This is a discord bot originally based off of my friend Eddy.

## Usage

Go to [https://discord.com/developers/applications](https://discord.com/developers/applications) and
create an application, then copy the token and client id and put it into a config.json file like the
following:

```json
{
 "token": "token-from-discord-developers-page",
 "clientId": "application-id-from-discord-developers-page"
}
```

Then `bun install` and `bun start`

## Commands

All commands have been updated to the new slash commands that discord is now using with
autocomplete. They can also be found in the `/src/commands` folder and will be logged to the console at bot startup.

## Links

This bot uses [DiscordJS](https://discord.js.org/). Check their website for more info on setting up or creating your own bot.

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested, and double-check the [DiscordJS guide](https://discordjs.guide/legacy).
See the [contribution guidelines](https://github.com/jorduino/eddybot/blob/main/.github/CONTRIBUTING.md) if you'd like to submit a PR.
