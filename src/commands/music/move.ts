// TODO embed
import Discord = require("discord.js");
import { Bot, SongData } from "../../types";
import Builder = require("@discordjs/builders");

module.exports = {
  name: "move",
  category: "music",
  permissions: [],
  alias: [],
  description: "Moves a song to another position",
  example: "move <position of the song> <new position>",
  devOnly: false,
  run: async (bot: Bot, message: Discord.Message, args) => {
    try {
      const { audio } = bot;
      const songs = audio.get(message.guildId).songs;
      let songIndex = Number(args[0]);
      let songPos = Number(args[1]);

      if (Number.isNaN(songIndex) === true || Number.isNaN(songPos) === true) {
        return message.channel.send("Please enter two numbers");
      }
      if (songIndex > songs.size || songPos > songs.size) {
        return message.channel.send("The number is too big");
      }

      let oldSong: SongData = songs.get(songPos);
      let movedSong: SongData = songs.get(songIndex);
      songs.set(songPos, movedSong);
      songs.set(songIndex, oldSong);

      const embed = new Builder.EmbedBuilder();
      embed.setDescription(
        `Moved song: ${movedSong.title} \n To position ${songPos}`,
      );
      embed.setColor(15548997);

      bot.client.channels
        .fetch(audio.get(message.guildId).textChannelID)
        .then((channel: Discord.TextChannel) => {
          channel.send({ embeds: [embed] });
        });
      message.channel.send("song moved");
    } catch {
      message.channel.send("no song");
    }
  },
};
