// TODO embed
import Discord = require("discord.js");
import Builder = require("@discordjs/builders");
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
      return message.channel.send("No song to skip"); // TODO make embed

    try {
      const guildID = message.guildId;
      const audioPlayer = audio.get(guildID).player;
      try {
        audioPlayer.stop();
        message.channel.send("Song skiped");
      } catch (err) {
        console.log(err);
        message.channel.send("An error occuered");
      }
    } catch (err) {
      console.log(err);
      message.reply("No song to skip");
    }
  },
};
