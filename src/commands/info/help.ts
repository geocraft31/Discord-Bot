import { getFiles } from "../../util/functions";
import fs = require("fs");
import Builder = require("@discordjs/builders");
import guildsData = require("../../data/guilds.json");
import Discord = require("discord.js");
import { Bot } from "../../types";

module.exports = {
  name: "help",
  category: "info",
  permissions: [],
  alias: ["h"],
  description: "Provides information about all the bot commands",
  example: "help <command>",
  devOnly: false,
  run: async (bot: Bot, message: Discord.Message, args) => {
    const guildId = message.guildId;

    if (Object.keys(guildsData).includes(guildId)) {
      var prefix: string = guildsData[guildId]["prefix"];
    } else {
      ({ prefix } = bot);
    }

    const categories = fs.readdirSync("./dist/commands");
    const commands = [];
    const data = {};

    categories.forEach((category) => {
      data[category] = [];
      getFiles(`./dist/commands/${category}`, ".js").forEach((file) => {
        let command = require(`../../commands/${category}/${file}`);
        if (command.devOnly) return;
        commands.push(file.replace(".js", ""));
        data[category].push(file.replace(".js", ""));
      });
    });
    if (args.length != 0) {
      // category
      if (categories.includes(args[0])) {
        const Embed = new Builder.EmbedBuilder().setColor(9807270);
        let categoryName = args[0];
        categoryName =
          categoryName.charAt(0).toUpperCase() +
          categoryName.slice(1).toLowerCase();
        Embed.setTitle(`__${categoryName}__`);
        Embed.addFields({
          name: "Commands",
          value: "```" + data[args[0]].join("  ") + "```",
        });
        message.reply({ embeds: [Embed] });
      }
      // command
      else if (commands.includes(args[0])) {
        let category = Object.keys(data).find((key) =>
          data[key].includes(args[0]),
        );

        let command = require(`../../commands/${category}/${args[0]}`);
        if (command.devOnly) return;

        const Embed = new Builder.EmbedBuilder().setColor(9807270);
        let commandName = command.name;
        commandName =
          commandName.charAt(0).toUpperCase() +
          commandName.slice(1).toLowerCase();
        Embed.setTitle(`__${commandName}__`);
        Embed.setDescription(command.description);
        Embed.addFields({
          name: "Use",
          value: "`" + prefix + command.example + "`",
        });

        var aliases = "";
        command.alias.forEach((name) => {
          aliases += name;
        });

        if (aliases.length != 0) {
          Embed.addFields({ name: "Aliases", value: "`" + aliases + "`" });
        }

        var perms = "";
        command.alias.forEach((perm) => {
          aliases += perm;
        });
        if (perms.length == 0) {
          perms = "`None`";
        }
        Embed.addFields({ name: "Necessary permissions", value: perms });
        message.reply({ embeds: [Embed] });
      }
    } else {
      // nothing
      const Embed = new Builder.EmbedBuilder()
        .setColor(9807270)
        .setTitle("Bot commands")
        .addFields(
          {
            name: "Help menu",
            value: `\nThe bot has ${categories.length} categories and ${commands.length} commands, feel free to try as many as you want \n\n Information about a category ${"`?help [category]`"} \n Information about a command ${"`?help [command]`"}`,
          },
          {
            name: "Categories",
            value:
              `${"`"}${prefix}help ` +
              categories.join(`${"`"} \n ${"`"}${prefix}help `) +
              "`",
          },
        );

      message.reply({ embeds: [Embed] });
    }
  },
};
