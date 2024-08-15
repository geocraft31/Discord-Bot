import { AudioSettings, Bot, SongData, ytVideo } from "../../types";
import Discord = require("discord.js");
import Builder = require("@discordjs/builders");
import Voice = require("@discordjs/voice");
import ytdl = require("youtube-dl-exec");
import {
  triggerEventHandler,
  playSong,
  logger,
  createTimeout,
  searchYoutube,
} from "../../util/functions";

module.exports = {
  name: "play",
  category: "music",
  permissions: [],
  alias: ["p"],
  description: "Plays the song given",
  example: "play <song>",
  devOnly: false,
  run: async (bot: Bot, message: Discord.Message, args: Array<string>) => {
    const { audio } = bot;

    const voiceChannel = message.member.voice;
    const guildID = message.guildId;

    if (!audio.has(guildID)) {
      let timer = createTimeout(bot, guildID);
      const settings = {
        player: new Voice.AudioPlayer({
          behaviors: {
            noSubscriber: Voice.NoSubscriberBehavior.Pause,
          },
          debug: true,
        }),
        textChannelID: message.channelId,
        songs: new Discord.Collection(),
        loopqueue: false,
        voiceChannel: voiceChannel,
        voiceChannelID: voiceChannel.channelId,
        disconectInterval: timer,
      };

      audio.set(guildID, settings);

      audio.get(guildID).player.on("stateChange", (oldState, newState) => {
        triggerEventHandler(bot, "stateChange", newState, guildID);
      });
    }

    clearInterval(audio.get(guildID).disconectInterval);

    const GuildAudio = audio.get(guildID);
    var audioPlayer = GuildAudio.player;

    if (voiceChannel.channelId == null) {
      return message.reply("Enter on a voice channel PUSSY");
    }

    if (GuildAudio.voiceConnection == undefined) {
      const voiceConnection = Voice.joinVoiceChannel({
        channelId: voiceChannel.channelId,
        guildId: guildID,
        debug: true,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      voiceConnection.on("stateChange", (oldState, newState) => {
        logger("Voice Connection change", newState.status);
      });

      GuildAudio.voiceConnection = voiceConnection;
    }

    const subscription = GuildAudio.voiceConnection.subscribe(audioPlayer);
    GuildAudio.subscription = subscription;

    let prompt = args.join(" ");

    const embed = new Builder.EmbedBuilder();

    if (prompt.includes("youtube.com")) {
      if (prompt.includes("playlist")) {
        let playlist = await searchYoutube(prompt, true);

        playlist.items.forEach((video: ytVideo) => {
          addSong(GuildAudio, video);
        });

        embed.setDescription(
          `**Added Playlist:** \n\n > **[${playlist.metadata.playlistMetadataRenderer.title}](${prompt})** \n > **Songs: ${playlist.items.length}**`,
        );

        embed.setImage(playlist.items[0].thumbnail.thumbnails[0].url);

        // embed.setTitle(playlist.metadata.playlistMetadataRenderer.title);
        // embed.setDescription("`[ Videos: " + playlist.items.length + " ]`");
        // embed.setThumbnail(playlist.items[0].thumbnail.thumbnails[0].url);
        // embed.setAuthor({ name: "Added playlist " });
        // embed.setURL(prompt);
        //
        embed.setColor(5763719);
      } else {
        //youtube video
        let raw_data = await searchYoutube(prompt);
        let yt_info: ytVideo = raw_data[0];

        if (yt_info.isLive) {
          yt_info.length = { simpleText: "Live", accessibility: {} };
        }

        addSong(GuildAudio, yt_info);

        embed.setImage(yt_info.thumbnail.thumbnails[0].url);
        embed.setDescription(
          `**Added Song:** \n\n > **[${yt_info.title}](https://www.youtube.com/watch?v=${yt_info.id})** \n  > **From: ${yt_info.channelTitle} | ${yt_info.length.simpleText} **`,
        );

        embed.setColor(5763719);

        // embed.setDescription("`[ " + yt_info.length.simpleText + " ]`");
        // embed.setTitle(yt_info.title);
        // embed.setThumbnail(yt_info.thumbnail.thumbnails[0].url);
        // embed.setAuthor({ name: "Added video" });
        // embed.setURL(`https://www.youtube.com/watch?v=${yt_info.id}`);
        // embed.setColor(5763719);
      }
    } else {
      let raw_data = await searchYoutube(prompt);
      let yt_info: ytVideo = raw_data[0];

      if (yt_info == undefined) {
        return message.reply("No song found");
      }

      if (yt_info.isLive) {
        yt_info.length = { simpleText: "Live", accessibility: {} };
      }

      addSong(GuildAudio, yt_info);

      // embed.setDescription(
      // "> **From: " +
      // yt_info.channelTitle +
      // " | " +
      // yt_info.length.simpleText +
      // " **",
      // );
      // embed.setTitle(`> ${yt_info.title}`);
      // embed.setImage(yt_info.thumbnail.thumbnails[0].url);
      // embed.setAuthor({ name: "Added song" });
      // embed.setURL(`https://www.youtube.com/watch?v=${yt_info.id‎u}`);

      embed.setImage(yt_info.thumbnail.thumbnails[0].url);
      embed.setDescription(
        `**Added Song:** \n\n > **[${yt_info.title}](https://www.youtube.com/watch?v=${yt_info.id})** \n  > **From: ${yt_info.channelTitle} | ${yt_info.length.simpleText} **`,
      );

      embed.setColor(5763719);
    }

    bot.client.channels
      .fetch(GuildAudio.textChannelID)
      .then((channel: Discord.TextChannel) => {
        if (GuildAudio.songs.size > 1) {
          channel.send({ embeds: [embed] });
        }
      });

    if (audioPlayer.state.status == "idle") {
      let song: SongData = GuildAudio.songs.get(0);
      GuildAudio.textChannelID = message.channelId;
      playSong(song, bot, guildID);
    }
  },
};

async function addSong(GuildAudio: AudioSettings, song: ytVideo) {
  if (song.length == undefined) {
    song.length = { simpleText: "Live", accessibility: {} };
  }

  var video_data = {
    title: song.title,
    url: `https://www.youtube.com/watch?v=${song.id}`,
    duration: song.length.simpleText,
    thumbnail: song.thumbnail.thumbnails[0].url,
    channel: song.channelTitle,
  };

  let songs = GuildAudio.songs;
  songs.set(songs.size, video_data);
}
