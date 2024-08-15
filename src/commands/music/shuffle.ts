// TODO embed
import Discord = require("discord.js")
import { Bot } from "../../types"

module.exports = {
    name: "shuffle",
    category: "music",
    permissions: [],
    alias: [],
    description: "Changes the position of all the songs",
    example: "shuffle",
    devOnly: false,
    run: async ( bot: Bot, message: Discord.Message, args ) => {
        const { audio } = bot
        try {
            const songs = audio.get(message.guildId).songs
            if (songs.size > 2) {
                let currentIndex = songs.size,
                    randomIndex = undefined

                // While there remain elements to shuffle.
                while (currentIndex != 1) {

                    // Pick a remaining element.
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;

                    // And swap it with the current element.
                    let temp = songs.get(currentIndex)
                    songs.set(currentIndex, songs.get(randomIndex))
                    songs.set(randomIndex, temp)

                }
                message.reply("Songs shifted")
            } else {
                message.reply("Not enough songs to shuffle")
            }
        } catch (err) {
            console.log(err, "Shuffle.js")
            message.reply("No songs to shuffle")
        }
    }
}
