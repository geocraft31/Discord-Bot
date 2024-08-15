import { Bot } from "../types";
import Voice = require("@discordjs/voice")
import Discord = require("discord.js")
import { playSong, disconectBot, createTimeout } from "../util/functions";
import { logger } from "./../util/functions"


module.exports = {
    name: "stateChange",
    run: async (bot: Bot, state: Voice.AudioPlayerState, guildID: string) => {

        logger("Voice state change", state.status)

        if (state.status == Voice.AudioPlayerStatus.Idle) {

            const GuildAudio = bot.audio.get(guildID)

            const loopqueue = GuildAudio.loopqueue
            const songs = GuildAudio.songs

            let first_song = songs.first()
            songs.delete(0)

            for (var i = 0; i < songs.size; i++) {
                songs.set(i, songs.get(i + 1))
                songs.delete(i + 1)
            }

            if (loopqueue)
                songs.set(songs.size, first_song)
            
            // no one left
            try {
                let channel = bot.client.channels.cache.get(GuildAudio.voiceChannelID)

                if (channel.isVoiceBased())
                    if (channel.members.size <= 1)
                        return disconectBot(bot, guildID)
                        
            } catch (err) {
                console.error(err)
            }

            // no songs left 
            if (songs.size == 0) {
                GuildAudio.disconectInterval = createTimeout(bot, guildID)
            }

            if (songs.size > 0) {
                let song = songs.first()
                await playSong(song, bot, guildID)
            }
        }
    }
}