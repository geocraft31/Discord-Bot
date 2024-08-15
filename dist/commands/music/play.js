"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var Builder = require("@discordjs/builders");
var Voice = require("@discordjs/voice");
var functions_1 = require("../../util/functions");
module.exports = {
    name: "play",
    category: "music",
    permissions: [],
    alias: ["p"],
    description: "Plays the song given",
    example: "play <song>",
    devOnly: false,
    run: function (bot, message, args) { return __awaiter(void 0, void 0, void 0, function () {
        var audio, voiceChannel, guildID, timer, settings, GuildAudio, audioPlayer, voiceConnection, subscription, prompt, embed, playlist, raw_data, yt_info, raw_data, yt_info, song;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    audio = bot.audio;
                    voiceChannel = message.member.voice;
                    guildID = message.guildId;
                    if (!audio.has(guildID)) {
                        timer = (0, functions_1.createTimeout)(bot, guildID);
                        settings = {
                            player: new Voice.AudioPlayer({
                                behaviors: {
                                    noSubscriber: Voice.NoSubscriberBehavior.Pause,
                                },
                                debug: true,
                            }),
                            textChannelID: message.channelId,
                            songs: new Discord.Collection(),
                            loopqueue: false,
                            voiceChannel: voiceChannel,
                            voiceChannelID: voiceChannel.channelId,
                            disconectInterval: timer,
                        };
                        audio.set(guildID, settings);
                        audio.get(guildID).player.on("stateChange", function (oldState, newState) {
                            (0, functions_1.triggerEventHandler)(bot, "stateChange", newState, guildID);
                        });
                    }
                    clearInterval(audio.get(guildID).disconectInterval);
                    GuildAudio = audio.get(guildID);
                    audioPlayer = GuildAudio.player;
                    if (voiceChannel.channelId == null) {
                        return [2, message.reply("Enter on a voice channel PUSSY")];
                    }
                    if (GuildAudio.voiceConnection == undefined) {
                        voiceConnection = Voice.joinVoiceChannel({
                            channelId: voiceChannel.channelId,
                            guildId: guildID,
                            debug: true,
                            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                        });
                        voiceConnection.on("stateChange", function (oldState, newState) {
                            (0, functions_1.logger)("Voice Connection change", newState.status);
                        });
                        GuildAudio.voiceConnection = voiceConnection;
                    }
                    subscription = GuildAudio.voiceConnection.subscribe(audioPlayer);
                    GuildAudio.subscription = subscription;
                    prompt = args.join(" ");
                    embed = new Builder.EmbedBuilder();
                    if (!prompt.includes("youtube.com")) return [3, 5];
                    if (!prompt.includes("playlist")) return [3, 2];
                    return [4, (0, functions_1.searchYoutube)(prompt, true)];
                case 1:
                    playlist = _a.sent();
                    playlist.items.forEach(function (video) {
                        addSong(GuildAudio, video);
                    });
                    embed.setTitle(playlist.metadata.playlistMetadataRenderer.title);
                    embed.setDescription("`[ Videos: " + playlist.items.length + " ]`");
                    embed.setThumbnail(playlist.items[0].thumbnail.thumbnails[0].url);
                    embed.setAuthor({ name: "Added playlist " });
                    embed.setURL(prompt);
                    embed.setColor(5763719);
                    return [3, 4];
                case 2: return [4, (0, functions_1.searchYoutube)(prompt)];
                case 3:
                    raw_data = _a.sent();
                    yt_info = raw_data[0];
                    addSong(GuildAudio, yt_info);
                    if (yt_info.length.simpleText == undefined) {
                        yt_info.length = { simpleText: "Live", accessibility: {} };
                    }
                    embed.setDescription("`[ " + yt_info.length.simpleText + " ]`");
                    embed.setTitle(yt_info.title);
                    embed.setThumbnail(yt_info.thumbnail.thumbnails[0].url);
                    embed.setAuthor({ name: "Added video" });
                    embed.setURL("https://www.youtube.com/watch?v=".concat(yt_info.id));
                    embed.setColor(5763719);
                    _a.label = 4;
                case 4: return [3, 7];
                case 5: return [4, (0, functions_1.searchYoutube)(prompt)];
                case 6:
                    raw_data = _a.sent();
                    yt_info = raw_data[0];
                    if (yt_info == undefined) {
                        return [2, message.reply("No song found")];
                    }
                    addSong(GuildAudio, yt_info);
                    if (yt_info.length.simpleText == undefined) {
                        yt_info.length = { simpleText: "Live", accessibility: {} };
                    }
                    embed.setDescription("`[ " + yt_info.length.simpleText + " ]`");
                    embed.setTitle(yt_info.title);
                    embed.setThumbnail(yt_info.thumbnail.thumbnails[0].url);
                    embed.setAuthor({ name: "Added song" });
                    embed.setURL("https://www.youtube.com/watch?v=".concat(yt_info.id));
                    embed.setColor(5763719);
                    _a.label = 7;
                case 7:
                    bot.client.channels
                        .fetch(GuildAudio.textChannelID)
                        .then(function (channel) {
                        channel.send({ embeds: [embed] });
                    });
                    if (audioPlayer.state.status == "idle") {
                        song = GuildAudio.songs.get(0);
                        GuildAudio.textChannelID = message.channelId;
                        (0, functions_1.playSong)(song, bot, guildID);
                    }
                    return [2];
            }
        });
    }); },
};
function addSong(GuildAudio, song) {
    return __awaiter(this, void 0, void 0, function () {
        var video_data, songs;
        return __generator(this, function (_a) {
            if (song.length.simpleText == undefined) {
                song.length = { simpleText: "Live", accessibility: {} };
            }
            video_data = {
                title: song.title,
                url: "https://www.youtube.com/watch?v=".concat(song.id),
                duration: song.length.simpleText,
                thumbnail: song.thumbnail.thumbnails[0].url,
                channel: song.channelTitle,
            };
            songs = GuildAudio.songs;
            songs.set(songs.size, video_data);
            return [2];
        });
    });
}
