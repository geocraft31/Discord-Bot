import Discord = require("discord.js");
import { Bot } from "../../types";

module.exports = {
  name: "loopqueue",
  category: "music",
  permissions: [],
  alias: ["lq"],
  description: "Repeats the play list currently playing",
  example: "loopqueue",
  devOnly: false,
  run: async (bot: Bot, message: Discord.Message, args) => {
    const { audio } = bot;
    try {
      audio.get(message.guildId).loopqueue = !audio.get(message.guildId)
        .loopqueue;
      // TODO embed
      if (audio.get(message.guildId).loopqueue) {
        message.channel.send(`Loop is active`);
      } else {
        message.channel.send("Loop is not active");
      }
    } catch (err) {
      console.error(err);
      // here too
      message.channel.send(
        "No songs to loop through, try adding some before running the command",
      );
    }
  },
};
