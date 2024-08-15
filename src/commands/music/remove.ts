// TODO embed
import Discord = require("discord.js")
import { Bot } from "../../types"

module.exports = {
    name: "remove",
    category: "music",
    permissions: [],
    alias: [],
    description: "Removes a song from the bot playlist",
    example: "remove <song postion>",
    devOnly: false,
    run: async ( bot: Bot, message: Discord.Message, args ) => {

        const { audio, client } = bot
        const guild = message.guildId
        try {
            const songs = audio.get(guild).songs
            let index = Number(args[0])

            if (Number.isNaN(index) === true) {
                return message.reply("Please enter a number")
            }

            songs.delete(index)
            for (var i = index; i < songs.size; i++) {
                songs.set(i, songs.get(i + 1))
                songs.delete(i + 1)
            }
            message.reply("song removed ")

        }
        catch (err) {
            console.log(err)
            message.reply("No songs playing")
        }
    }
}
