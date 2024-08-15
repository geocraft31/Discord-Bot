import guildData = require("./../../data/guilds.json")
import fs = require("fs")
import path = require("path")
import Discord = require("discord.js")
import { Bot } from "../../types"

module.exports = {
    name: "prefix",
    category: "config",
    permissions: ["Administrator"],
    alias: [],
    description: "Change the prefix for the server",
    example: "prefix <new prefix>",
    devOnly: false,
    run: async ( bot: Bot, message: Discord.Message, args ) => {

        if (args.length > 1)
            return message.reply("Please only enter 1 prefix")
        else if (args.length == 0)
            return message.reply("Please provide a prefix")

        guildData[message.guildId]["prefix"] = args[0]

        const dataPath = path.resolve(__dirname, "../../data/guilds.json")

        fs.writeFile(dataPath, JSON.stringify(guildData), err => {
            if (err) console.log("error writing file:", err)
        })

        message.reply(`New prefix ${"`"}${args[0]}${"`"} applied`)
    }
}
