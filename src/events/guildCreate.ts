import { Bot } from "../types";
import Discord = require("discord.js")
import guildData = require("./../data/guilds.json")
import path = require("path")
import fs = require("fs")
import { logger } from "./../util/functions"

module.exports = {
    name: "guildCreate",
    run: async (bot: Bot, guild: Discord.Guild) => {

        logger("Joined", "guild", guild.id)

        let { prefix } = bot

        guildData[guild.id] = { "prefix": prefix}

        const dataPath = path.resolve(__dirname, "./../data/guilds.json")

        fs.writeFileSync(dataPath, JSON.stringify(guildData, null, 4))
    }
}