const { Readable } = require('stream');
const { createReadStream } = require('fs');
const { join } = require('path');
const { createAudioResource, createAudioPlayer, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
  name: 'livestream',
  description: 'Plays the audio from the m3u stream in a voice channel',
  async execute(message) {
    // Check if the user is in a voice channel
    if (!message.member.voice.channel) {
      return message.reply('You need to be in a voice channel to use this command!');
    }

    // Join the voice channel
    const connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    // Read the m3u stream file
    const streamPath = join(__dirname, '..', 'streams', 'stream.m3u');
    const streamFile = createReadStream(streamPath);

    // Create a readable stream from the file
    const stream = new Readable();
    stream._read = () => {};
    stream.push(streamFile);
    stream.push(null);

    // Create an audio resource from the stream
    const resource = createAudioResource(stream);

    // Create an audio player and play the resource
    const player = createAudioPlayer();
    player.play(resource);

    // Subscribe the player to the connection
    connection.subscribe(player);

    // Wait for the player to finish playing
    await new Promise((resolve) => {
      player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
        resolve();
      });
    });
  },
};