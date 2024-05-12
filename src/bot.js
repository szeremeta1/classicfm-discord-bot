const config = require('./config.json')
const Discord = require('discord.js');
const dVC = require('@discordjs/voice');
const prism = require('prism-media');
const fs = require('fs');
const cron = require('node-cron');

const client = new Discord.Client({
	intents: [
		"Guilds",
    "GuildMessages",
    "MessageContent",
    "GuildVoiceStates",
	],
});

const prefix = '!';

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  console.log(`Received command: ${command}`); // Log the received command

  if (command === 'livestream') {
    const voiceChannel = message.member.voice.channel;
  
    if (!voiceChannel) {
      return message.reply('You need to be in a voice channel to use this command!');
    }
  
    fs.readFile('./src/streams/stream.m3u', 'utf8', (err, data) => {
      if (err) {
        console.error(`Error occurred: ${err}`);
        return;
      }
    
      // Split the file by newlines and filter out any empty lines
      const lines = data.split('\n').filter(line => line.trim() !== '');
    
      // Assume the first line is a URL to an M3U livestream
      const streamURL = lines[0];
    
      console.log(`Playing stream: ${streamURL}`);
      JoinChannel(voiceChannel, 'https://icecast.thisisdax.com/ClassicFM', 2);
    }
  )  }
});

let streamJob = null;

function JoinChannel(channel, track, volume) {
  const connection = dVC.joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: true
  });
  
  connection.on(dVC.VoiceConnectionStatus.Disconnected, async () => {
    let attemptReconnect = true;
    while (attemptReconnect) {
        try {
            console.log("Disconnected. Attempting to reconnect...");
            await Promise.race([
                entersState(connection, dVC.VoiceConnectionStatus.Signalling, 5_000),
                entersState(connection, dVC.VoiceConnectionStatus.Connecting, 5_000),
            ]);
            console.log("Reconnected successfully.");
            attemptReconnect = false;
        } catch (error) {
            console.log("Reconnection attempt failed. Retrying...");
        }
    }
});

  const resource = dVC.createAudioResource(track, {inlineVolume: true, silencePaddingFrames: 5});
  const player = dVC.createAudioPlayer();
  resource.volume.setVolume(2);
  connection.subscribe(player)
  player.play(resource);

  connection.on(dVC.VoiceConnectionStatus.Ready, () => {console.log("ready"); player.play(resource);})
  connection.on(dVC.VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
      try {
          console.log("Disconnected.")
          await Promise.race([
              dVC.entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
              dVC.entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
          ]);
      } catch (error) {
          connection.destroy();
      }
  });
  player.on('error', error => {
      console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
      player.stop();
  });
  player.on(dVC.AudioPlayerStatus.Playing, () => {
      console.log('The audio player has started playing!');
  }); 
  player.on('idle', () => {
      connection.destroy();
  })

  // Schedule a cron job to restart the stream every 15 minutes
  if (streamJob) {
    streamJob.stop();
  }
  streamJob = cron.schedule('*/15 * * * *', () => {
    console.log('Restarting stream...');
    player.stop();
    player.play(resource);
  });
}

function LeaveVoiceChannel(channel) {
  // Get resource, player, etc, and destroy them
  const connection = dVC.getVoiceConnection(channel.guild.id);
  if (connection) {
      connection.destroy();
  }
}
client.login(config.token).catch(error => console.error(`Login error: ${error}`)); // Log any login errors