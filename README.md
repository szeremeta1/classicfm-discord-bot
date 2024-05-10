# classicfm-discord-bot
![Classic_FM_logo svg](https://github.com/szeremeta1/classicfm-discord-bot/assets/66704967/a370d30e-8278-4124-afd0-84252c061d49)


A bot that constantly streams ClassicFM, a British classical music radio station, into a Discord voice channel of the user's choosing.

This bot uses an **m3u8** stream as its source and joins a channel of the user's choosing until it is forcefully disconnected. This can be helpful if you want to just make a voice channel for peacefully listening to classical music, and **it can be used with any mp3 or m3u8 stream**. 

Like any other bot, this requires that you make an application (bot) in the [Discord Developer Portal](https://discord.com/developers/applications).

This mini project quite literally would not have been possible without [@ChrisChrome](https://github.com/ChrisChrome), who basically made the whole fucking thing work and showed me the limitations of both Discord bots and JavaScript as a whole.

## How To Use
First, clone this GitHub repository and open it.
```
git clone https://github.com/usermeta1/classicfm-discord-bot.git
cd classicfm-discord-bot.git
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
pm2 start ./src/bot.js
```

## Troubleshooting
### Cannot Play Audio: No Valid Encryption Package is Installed
If you receive an error like this:
```
Error: Cannot play audio as no valid encryption package is installed.
- Install sodium, libsodium-wrappers, or tweetnacl.
- Use the generateDependencyReport() function for more information.

    at Object.fallbackError (/home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js:215:9)
    at Networking.encryptOpusPacket (/home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js:885:17)
    at Networking.createAudioPacket (/home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js:869:69)
    at Networking.prepareAudioPacket (/home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js:793:33)
    at VoiceConnection.prepareAudioPacket (/home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js:1933:29)
    at AudioPlayer._preparePacket (/home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js:1324:18)
    at AudioPlayer._stepPrepare (/home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js:1294:14)
    at prepareNextAudioFrame (/home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js:136:29)
    at audioCycleStep (/home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js:125:3)
    at Timeout._onTimeout (/home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js:132:45)
```

Then `sodium` is being a bitch. Despite saying it needs to be installed, it is already in `node_modules`. This can be fixed by completely deleting `sodium` from `node_modules` and reinstalling it.
```
cd classicfm-discord-bot
cd node_modules
sudo rm -rf sodium
cd
cd classicfm-discord-bot
npm i sodium
```

This may take a while, as it has for me. Just wait patiently, even if it appears to be frozen. After it's done, `cd` back into `classicfm-discord-bot` and start the bot.
```
cd classicfm-discord-bot
pm2 start ./src/bot.js
```

### Error: Cannot find module 'node-opus' / 'opusscript'
Similarly to the `sodium` error, in this case, `opusscript` is being a bitch. The error you may receive looks like this:
```
Error: Cannot find module 'node-opus'
Require stack:
- /home/user/classicfm-discord-bot/node_modules/prism-media/src/util/loader.js
- /home/user/classicfm-discord-bot/node_modules/prism-media/src/opus/Opus.js
- /home/user/classicfm-discord-bot/node_modules/prism-media/src/opus/index.js
- /home/user/classicfm-discord-bot/node_modules/prism-media/src/index.js
- /home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js
- /home/user/classicfm-discord-bot/src/bot.js
Error: Cannot find module 'opusscript'
Require stack:
- /home/user/classicfm-discord-bot/node_modules/prism-media/src/util/loader.js
- /home/user/classicfm-discord-bot/node_modules/prism-media/src/opus/Opus.js
- /home/user/classicfm-discord-bot/node_modules/prism-media/src/opus/index.js
- /home/user/classicfm-discord-bot/node_modules/prism-media/src/index.js
- /home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js
- /home/user/classicfm-discord-bot/src/bot.js
    at Object.loader [as require] (/home/user/classicfm-discord-bot/node_modules/prism-media/src/util/loader.js:12:9)
    at loadOpus (/home/user/classicfm-discord-bot/node_modules/prism-media/src/opus/Opus.js:17:17)
    at new OpusStream (/home/user/classicfm-discord-bot/node_modules/prism-media/src/opus/Opus.js:46:10)
    at new Encoder (/home/user/classicfm-discord-bot/node_modules/prism-media/src/opus/Opus.js:149:5)
    at Object.transformer (/home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js:2224:24)
    at /home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js:2457:58
    at Array.map (<anonymous>)
    at Object.createAudioResource (/home/user/classicfm-discord-bot/node_modules/@discordjs/voice/dist/index.js:2457:39)
    at JoinChannel (/home/user/classicfm-discord-bot/src/bot.js:69:24)
    at /home/user/classicfm-discord-bot/src/bot.js:55:7
```

To solve this error, simply `cd` into `classicfm-discord-bot` and reinstall it. For this module, I didn't need to `rm -rf` it from `node-modules`, but your situation may be different.
```
cd classicfm-discord-bot
npm i opusscript
```

This shouldn't take long. When it is complete, attempt to start the bot again with `pm2 start ./src/bot.js` or `node ./src/bot.js` while in the `classicfm-discord-bot` folder.
