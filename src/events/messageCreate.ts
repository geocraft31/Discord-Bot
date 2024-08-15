import { Bot, Command } from "../types";
import Discord = require("discord.js")
import guildData = require("./../data/guilds.json")
import { logger } from "./../util/functions"

module.exports = {
    name: "messageCreate",
    run: async (bot: Bot, message: Discord.Message) => {
        
        if (Object.keys(guildData).includes(message.guildId)) {
            var prefix: string = guildData[message.guildId].prefix
        } else {
            var { prefix } = bot
        }

        if (!message.guild) return

        if (message.author.bot) return

        if (!message.content.startsWith(prefix)) return

        const args = message.content.slice(prefix.length).trim().split(" ")
        const cmdstr = args.shift().toLowerCase()

        let command: Command = bot.commands.get(cmdstr)
        if (!command) return

        let member = message.member

        if (command.devOnly && !bot.owners.includes(member.id)) {
            return message.reply("This command is only available to the bot owners")
        }

        if (command.permissions && member.permissions.missing(command.permissions).length !== 0) {
            return message.reply("You do not have permissions to use this command")
        }

        try {

            logger("Command", command.name, args)

            await command.run(bot, message, args)
        } 
        catch (err) {
            console.error(err)
        }

    }
}