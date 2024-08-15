import { Bot } from "../../types"
import Voice = require("@discordjs/voice")
import Discord = require("discord.js")
import Builder = require("@discordjs/builders")
import { disconectBot } from "../../util/functions"

module.exports = {
    name: "leave",
    category: "music",
    permissions: [],
    alias: [],
    description: "Removes the bot from the voice channel",
    example: "leave",
    devOnly: false,
    run: async (bot: Bot, message: Discord.Message) => {
        const guildID = message.guildId
        const GuildAudio = bot.audio.get(guildID)

        disconectBot(bot, guildID)


        const embed = new Builder.EmbedBuilder()
        embed.setTitle("I left the voice channel")
        embed.setAuthor({name: "Disconnected"})
        embed.setColor(15548997)
        
        bot.client.channels.fetch(GuildAudio.textChannelID).then((channel:Discord.TextChannel) => {
            channel.send({ embeds: [embed] })
        })

    }
}
