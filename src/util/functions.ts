import fs = require("fs");
import ytdl = require("youtube-dl-exec");
import ytSearch = require("youtube-search-api");
import { Bot, Event, SongData } from "../types";
import Builder = require("@discordjs/builders");
import Discord = require("discord.js");
import Voice = require("@discordjs/voice");
import { DuplexOptions, Duplex } from "node:stream";

class MyStream extends Duplex {
  constructor(options?: DuplexOptions) {
    super(options);
  }

  _read(size: number): void {
    // No implementation needed for this example
  }

  _write(
    chunk: any,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ): void {
    // Write the chunk to the readable side
    this.push(chunk);
    callback();
  }

  _final(callback: (error?: Error | null) => void): void {
    // Signal the end of the readable stream
    this.push(null);
    callback();
  }
}

export const getFiles = (path: string, ending: string) => {
  return fs.readdirSync(path).filter((f) => f.endsWith(ending));
};

export const triggerEventHandler = (bot: Bot, eventName: string, ...args) => {
  const { client } = bot;

  try {
    if (bot.events.has(eventName)) bot.events.get(eventName).run(bot, ...args);
    else throw new Error(`Event ${eventName} does not exist`);
  } catch (err) {
    console.error(err);
  }
};

export const logger = (type: string, name: string, ...args: any) => {
  let date = new Date();
  let hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds();

  var hourFormated: any = hour,
    minuteFormated: any = minute,
    secondFormated: any = second;

  if (hour < 10) {
    hourFormated = "0" + hour;
  }
  if (minute < 10) {
    minuteFormated = "0" + minute;
  }
  if (second < 10) {
    secondFormated = "0" + second;
  }

  const dateformat =
    "[ \x1b[32m" +
    [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/") +
    " - " +
    [hourFormated, minuteFormated, secondFormated].join(":") +
    " \x1b[0m]";

  if (args != "") {
    console.log(
      `${dateformat} ~ ${type}: \x1b[33m${name}\x1b[0m (\x1b[36m ${args.join(" ")} \x1b[0m)`,
    );
  } else {
    console.log(`${dateformat} ~ ${type}: \x1b[33m${name}\x1b[0m`);
  }
};

export const playSong = async (song: SongData, bot: Bot, guildID: string) => {
  const channelID = bot.audio.get(guildID).textChannelID;
  const audioPlayer = bot.audio.get(guildID).player;

  let title = song.title,
    duration = song.duration,
    thumbnail = song.thumbnail,
    url = song.url,
    channel = song.channel;

  const embed = new Builder.EmbedBuilder();

  embed.setImage(thumbnail);
  embed.setDescription(
    `**Now Playing:** \n\n > **[${title}](${url})** \n  > **From: ${channel} | ${duration} **`,
  );

  // embed.setTitle(title);
  // embed.setDescription("`[ " + duration + " ]`");
  // embed.setThumbnail(thumbnail);
  // embed.setAuthor({ name: "Now Playing" });
  // embed.setURL(url);
  embed.setColor(1752220);

  //const stream = await Play.stream(url);

  const stream = new MyStream();

  const ytdlStream = ytdl.exec(song.url, {
    output: "-",
    audioFormat: "opus",
    extractAudio: true,
  });

  ytdlStream.stdout.on("data", (chunk) => {
    stream.write(chunk);
  });

  const songResource = Voice.createAudioResource(stream);

  audioPlayer.play(songResource);

  bot.client.channels.fetch(channelID).then((channel: Discord.TextChannel) => {
    channel.send({ embeds: [embed] });
  });
};

export const searchYoutube = async (
  query: string,
  playlist: boolean = false,
) => {
  try {
    if (playlist) {
      const listId = query.split("=")[1].split("&")[0];
      const result = await ytSearch.GetPlaylistData(listId);

      return result;
    }
    const result = await ytSearch.GetListByKeyword(query, false);
    return result.items;
  } catch (error) {
    console.error("Error searching youtube:", error);
    return [];
  }
};

export const disconectBot = (bot: Bot, guildID: string) => {
  const GuildAudio = bot.audio.get(guildID);

  GuildAudio.voiceConnection.disconnect();
  GuildAudio.subscription.unsubscribe();
  clearTimeout(GuildAudio.disconectInterval);
  GuildAudio.voiceConnection.removeAllListeners();
  GuildAudio.player.removeAllListeners();

  bot.audio.delete(guildID);
};

export const createTimeout = (bot: Bot, guildID: string) => {
  return setTimeout(() => {
    disconectBot(bot, guildID);
  }, 60 * 1000);
};

module.exports = {
  getFiles,
  playSong,
  triggerEventHandler,
  logger,
  disconectBot,
  createTimeout,
  searchYoutube,
};
