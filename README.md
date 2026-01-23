# Eddybot

[![Tests](https://github.com/jorduino/eddybot/actions/workflows/tests.yml/badge.svg)](https://github.com/jorduino/eddybot/actions/workflows/tests.yml)
[![GitHub Release](https://img.shields.io/github/v/release/jorduino/eddybot)](https://github.com/jorduino/eddybot/releases)

## About

This is a discord bot originally based off of my friend Eddy.

## Usage

1. Go to [https://discord.com/developers/applications](https://discord.com/developers/applications) and create an application
2. Copy the token and client ID
3. Set the environment variables:

   ```bash
   export DISCORD_TOKEN=your_bot_token
   export DISCORD_CLIENT_ID=your_client_id
   ```

   Or create a `.env` file (see `.env.example`):

   ```env
   DISCORD_TOKEN=your_bot_token
   DISCORD_CLIENT_ID=your_client_id
   ```

4. Install and run:

   ```bash
   bun install
   bun start
   ```

### Using a pre-built binary

Download the appropriate binary for your platform from the [releases page](https://github.com/jorduino/eddybot/releases), set the environment variables, and run it directly.

## Commands

All commands have been updated to the new slash commands that discord is now using with
autocomplete. They can also be found in the `/src/commands` folder and will be logged to the console at bot startup.

## Links

This bot uses [DiscordJS](https://discord.js.org/). Check their website for more info on setting up or creating your own bot.

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested, and double-check the [DiscordJS guide](https://discordjs.guide/legacy).
See the [contribution guidelines](https://github.com/jorduino/eddybot/blob/main/.github/CONTRIBUTING.md) if you'd like to submit a PR.
