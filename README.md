# ClassicFM Discord Bot
![Classic_FM_logo svg](https://github.com/szeremeta1/classicfm-discord-bot/assets/66704967/a370d30e-8278-4124-afd0-84252c061d49)


A bot that constantly streams ClassicFM, a British classical music radio station, into a Discord voice channel of the user's choosing.

This bot uses an **m3u8** stream as its source and joins a channel of the user's choosing until it is forcefully disconnected. This can be helpful if you want to just make a voice channel for peacefully listening to classical music, and **it can be used with any mp3 or m3u8 stream**. 

Like any other bot, this requires that you make an application (bot) in the [Discord Developer Portal](https://discord.com/developers/applications).

This mini project quite literally would not have been possible without [@ChrisChrome](https://github.com/ChrisChrome), who basically made the whole fucking thing work and showed me the limitations of both Discord bots and JavaScript as a whole.

## How To Use
First, clone this GitHub repository, open it, and install dependencies.
```
git clone https://github.com/szeremeta1/classicfm-discord-bot.git
cd classicfm-discord-bot
npm i
```

Next, add your bot token you obtained from the Discord Developer Portal.
```
cd src
sudo nano config.json
```

Finally, `cd` back into `classicfm-discord-bot` and start the bot.
```
cd
cd classicfm-discord-bot
node start ./src/bot.js
```

For process management, I highly recommend [pm2](https://pm2.keymetrics.io) to ensure the bot is online 24/7.
