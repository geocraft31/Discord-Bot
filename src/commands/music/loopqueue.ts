import Discord = require("discord.js")
import { Bot } from "../../types"

module.exports = {
    name: "loopqueue",
    category: "music",
    permissions: [],
    alias: ["lq"],
    description: "Repeats the play list currently playing",
    example: "loopqueue",
    devOnly: false,
    run: async ( bot: Bot, message: Discord.Message, args ) => {
        const { audio } = bot
        try {
            audio.get(message.guildId).loopqueue = !audio.get(message.guildId).loopqueue
            // TODO embed
            message.reply(`Loop is ${audio.get(message.guildId).loopqueue}`)
        } catch (err) {
            console.error(err)
            // here too
            message.reply("No songs to loop throw, try adding some before running the command")
        }
    }
}
