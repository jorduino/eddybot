# Eddybot

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
autocomplete. They can also be found in the `/commands` folder and will be logged to the console at bot startup.
