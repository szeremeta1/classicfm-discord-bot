# classicfm-discord-bot
![image](https://github.com/szeremeta1/classicfm-discord-bot/assets/66704967/9e0d5bde-b57f-4474-b16e-a1ab552c119d)

A bot that constantly streams ClassicFM, a British classical music radio station, into a Discord voice channel of the user's choosing.

This bot uses an **m3u8** stream as its source and joins a channel of the user's choosing until it is forcefully disconnected. This can be helpful if you want to just make a voice channel for peacefully listening to classical music, and **it can be used with any mp3 or m3u8 stream**. 

First, the bot is started using `pm2 start bot.js`. PM2 is a popular process manager, and will automatically restart the bot if it crashes (and will restart the bot every day at midnight in your timezone). **If you do not use PM2 or another process manager, the bot will simply shut down every night at midnight.**

To use the bot, type ``!livestream`` into any text channel that the bot can access while you are in a voice channel that the bot can access.

Like any other bot, this requires that you make an application (bot) in the [Discord Developer Portal](https://discord.com/developers/applications).

This mini project quite literally would not have been possible without [@ChrisChrome](https://github.com/ChrisChrome), who basically made the whole fucking thing work and showed me the limitations of both Discord bots and JavaScript as a whole.
