// TODO embed
import Discord = require("discord.js");
import { Bot } from "../../types";

module.exports = {
  name: "remove",
  category: "music",
  permissions: [],
  alias: [],
  description: "Removes a song from the bot playlist",
  example: "remove <song postion>",
  devOnly: false,
  run: async (bot: Bot, message: Discord.Message, args) => {
    const { audio, client } = bot;
    const guild = message.guildId;
    try {
      if (audio.get(guild) == undefined) {
        return message.channel.send("No songs playing");
      }

      const songs = audio.get(guild).songs;
      let index = Number(args[0]);

      if (Number.isNaN(index) === true) {
        return message.channel.send("Please enter a number");
      }

      if (index <= 0) {
        return message.channel.send("Enter a number greater than 0");
      }

      if (index > songs.size) {
        return message.channel.send("The number is too big");
      }

      songs.delete(index);
      for (var i = index; i < songs.size; i++) {
        songs.set(i, songs.get(i + 1));
        songs.delete(i + 1);
      }
      message.channel.send("song removed ");
    } catch (err) {
      console.log(err);
    }
  },
};
