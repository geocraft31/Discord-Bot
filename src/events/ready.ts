import { Bot } from "../types";

module.exports = {
  name: "ready",
  run: async (bot: Bot) => {
    console.log(`Logged in as: \u001B[36m ${bot.client.user.tag}\u001B[0m \n`);

    bot.client.user.setActivity("?help");
    bot.client.user.setStatus("invisible");
  },
};
