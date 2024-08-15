import Builder = require("@discordjs/builders");
import Discord = require("discord.js")
import Play = require("play-dl")
import { Bot } from "../../types";

module.exports = {
    name: "queue",
    category: "music",
    permissions: [],
    alias: ["q"],
    description: "Displays all of the songs added to the bot",
    example: "queue",
    devOnly: false,
    run: async ( bot: Bot, message: Discord.Message, args ) => {

        const { client, audio } = bot
        try {
            var songs = audio.get(message.guildId).songs
        } catch {
            await message.reply("No songs in the playlist, try adding some music before running this command")
            return
        }

        const embed = new Builder.EmbedBuilder()

        var embedDescription = ``
        let firstSong = songs.first()

        let firstSongField = `[${firstSong.title}](${firstSong.url}) \n ${firstSong.channel} [${firstSong.duration}]`

        embed.setAuthor({ name: `Playlist` })
        embed.setThumbnail(firstSong.thumbnail)
        embed.setColor(1146986)

        embedDescription += `**Now playing:** \n${firstSongField} \n\n`

        if (songs.size > 25) {
            var length = 24
        } else {
            var length = songs.size
        }

        for (var i = 1; i < length; i++) {
            let song = songs.get(i)
            embedDescription += `${i} - [${song.title}](${song.url}) \n ${song.channel} [${song.duration}] \n\n`

        }
        embed.setDescription(embedDescription)
        
        await message.channel.send({ embeds: [embed] })
    }
}
