// TODO embed
import Discord = require("discord.js");
import { Bot } from "../../types";

module.exports = {
  name: "skip",
  category: "music",
  permissions: [],
  alias: ["s"],
  description: "Skips the currently playing song",
  example: "skip",
  devOnly: false,
  run: async (bot: Bot, message: Discord.Message, args) => {
    const { audio } = bot;
    if (bot.audio.get(message.guildId) == undefined)
      return message.reply("No song to skip"); // TODO make embed

    try {
      const guildID = message.guildId;
      const audioPlayer = audio.get(guildID).player;
      try {
        audioPlayer.stop();
      } catch (err) {
        console.log(err);
        message.reply("error");
      }
    } catch (err) {
      console.log(err);
      message.reply("No song to skip");
    }
  },
};
