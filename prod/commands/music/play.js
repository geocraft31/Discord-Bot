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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var Builder = require("@discordjs/builders");
var Voice = require("@discordjs/voice");
var Play = require("play-dl");
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
        var audio, voiceChannel, guildID, timer, settings, GuildAudio, audioPlayer, voiceConnection, subscription, prompt, embed, playlist_raw, playlist, yt_info, spotify_data, tracks, n, _loop_1, _a, tracks_1, tracks_1_1, e_1_1, raw_data, yt_info, raw_data, yt_info, song;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    audio = bot.audio;
                    voiceChannel = message.member.voice;
                    guildID = message.guildId;
                    if (!audio.has(guildID)) {
                        timer = (0, functions_1.createTimeout)(bot, guildID);
                        settings = {
                            player: new Voice.AudioPlayer({
                                behaviors: {
                                    noSubscriber: Voice.NoSubscriberBehavior.Pause
                                },
                                debug: true
                            }),
                            textChannelID: message.channelId,
                            songs: new Discord.Collection,
                            loopqueue: false,
                            voiceChannel: voiceChannel,
                            voiceChannelID: voiceChannel.channelId,
                            disconectInterval: timer
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
                            adapterCreator: voiceChannel.guild.voiceAdapterCreator
                        });
                        voiceConnection.on("stateChange", function (oldState, newState) {
                            (0, functions_1.logger)("Voice Connection change", newState.status);
                        });
                        GuildAudio.voiceConnection = voiceConnection;
                    }
                    subscription = GuildAudio.voiceConnection.subscribe(audioPlayer);
                    GuildAudio.subscription = subscription;
                    prompt = args.join(' ');
                    embed = new Builder.EmbedBuilder();
                    if (!prompt.includes("youtube.com")) return [3, 6];
                    if (!prompt.includes("playlist")) return [3, 3];
                    return [4, Play.playlist_info(prompt)];
                case 1:
                    playlist_raw = _e.sent();
                    return [4, playlist_raw.all_videos()];
                case 2:
                    playlist = _e.sent();
                    playlist.forEach(function (video) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            addSong(GuildAudio, video);
                            return [2];
                        });
                    }); });
                    embed.setTitle(playlist_raw.title);
                    embed.setDescription("`[ Videos: " + playlist_raw.total_videos + " ]`");
                    embed.setThumbnail(playlist_raw.thumbnail.url);
                    embed.setAuthor({ name: "Added playlist" });
                    embed.setURL(playlist_raw.url);
                    embed.setColor(5763719);
                    return [3, 5];
                case 3: return [4, Play.video_info(prompt)];
                case 4:
                    yt_info = (_e.sent()).video_details;
                    addSong(GuildAudio, yt_info);
                    embed.setTitle(yt_info.title);
                    embed.setDescription("`[ 00:00 | " + yt_info.durationRaw + " ]`");
                    embed.setThumbnail(yt_info.thumbnails[0].url);
                    embed.setAuthor({ name: "Added video" });
                    embed.setURL(yt_info.url);
                    embed.setColor(5763719);
                    _e.label = 5;
                case 5: return [3, 27];
                case 6:
                    if (!prompt.includes("spotify")) return [3, 25];
                    return [4, Play.spotify(prompt)];
                case 7:
                    spotify_data = (_e.sent());
                    if (!(spotify_data.type == "playlist")) return [3, 22];
                    message.reply("this can take a while please wait while the bot adds all the songs");
                    return [4, spotify_data.all_tracks()];
                case 8:
                    tracks = _e.sent();
                    n = 0;
                    _e.label = 9;
                case 9:
                    _e.trys.push([9, 15, 16, 21]);
                    _loop_1 = function () {
                        var track, raw_data, video, errorEmbed_1, song, err_1;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _d = tracks_1_1.value;
                                    _a = false;
                                    _f.label = 1;
                                case 1:
                                    _f.trys.push([1, , 6, 7]);
                                    track = _d;
                                    n++;
                                    _f.label = 2;
                                case 2:
                                    _f.trys.push([2, 4, , 5]);
                                    return [4, Play.search("".concat(track.name, " ").concat(track.artists[0].name))];
                                case 3:
                                    raw_data = _f.sent();
                                    video = raw_data[0];
                                    if (video != undefined) {
                                        addSong(GuildAudio, video);
                                    }
                                    else {
                                        errorEmbed_1 = new Builder.EmbedBuilder();
                                        errorEmbed_1.setTitle(track.name);
                                        errorEmbed_1.setDescription("`[ ERROR ]`");
                                        errorEmbed_1.setThumbnail(track.thumbnail.url);
                                        errorEmbed_1.setAuthor({ name: "Could not find the song in youtube" });
                                        errorEmbed_1.setURL(track.url);
                                        errorEmbed_1.setColor(15548997);
                                        bot.client.channels.fetch(GuildAudio.textChannelID).then(function (channel) {
                                            channel.send({ embeds: [errorEmbed_1] });
                                        });
                                    }
                                    if (GuildAudio.songs.size == 1 && audioPlayer.state.status == "idle") {
                                        song = GuildAudio.songs.get(0);
                                        GuildAudio.textChannelID = message.channelId;
                                        (0, functions_1.playSong)(song, bot, guildID);
                                    }
                                    return [3, 5];
                                case 4:
                                    err_1 = _f.sent();
                                    console.log(err_1);
                                    return [3, 5];
                                case 5: return [3, 7];
                                case 6:
                                    _a = true;
                                    return [7];
                                case 7: return [2];
                            }
                        });
                    };
                    _a = true, tracks_1 = __asyncValues(tracks);
                    _e.label = 10;
                case 10: return [4, tracks_1.next()];
                case 11:
                    if (!(tracks_1_1 = _e.sent(), _b = tracks_1_1.done, !_b)) return [3, 14];
                    return [5, _loop_1()];
                case 12:
                    _e.sent();
                    _e.label = 13;
                case 13: return [3, 10];
                case 14: return [3, 21];
                case 15:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 21];
                case 16:
                    _e.trys.push([16, , 19, 20]);
                    if (!(!_a && !_b && (_c = tracks_1.return))) return [3, 18];
                    return [4, _c.call(tracks_1)];
                case 17:
                    _e.sent();
                    _e.label = 18;
                case 18: return [3, 20];
                case 19:
                    if (e_1) throw e_1.error;
                    return [7];
                case 20: return [7];
                case 21:
                    embed.setTitle(spotify_data.name);
                    embed.setDescription("`[ Songs: " + spotify_data.tracksCount + " ]`");
                    embed.setThumbnail(spotify_data.thumbnail.url);
                    embed.setAuthor({ name: "Added playlist" });
                    embed.setURL(spotify_data.url);
                    embed.setColor(5763719);
                    return [3, 24];
                case 22:
                    if (!(spotify_data.type == "track")) return [3, 24];
                    return [4, Play.search("".concat(spotify_data.name, " ").concat(spotify_data.artists[0].name))];
                case 23:
                    raw_data = (_e.sent());
                    yt_info = raw_data[0];
                    addSong(GuildAudio, yt_info);
                    embed.setTitle(yt_info.title);
                    embed.setDescription("`[ 00:00 | " + yt_info.durationRaw + " ]`");
                    embed.setThumbnail(yt_info.thumbnails[0].url);
                    embed.setAuthor({ name: "Added song" });
                    embed.setURL(yt_info.url);
                    embed.setColor(5763719);
                    _e.label = 24;
                case 24: return [3, 27];
                case 25: return [4, Play.search(prompt, { limit: 1 })];
                case 26:
                    raw_data = _e.sent();
                    yt_info = raw_data[0];
                    if (yt_info == undefined) {
                        return [2, message.reply("No se encontro ninguna canción")];
                    }
                    addSong(GuildAudio, yt_info);
                    embed.setTitle(yt_info.title);
                    embed.setDescription("`[ 00:00 | " + yt_info.durationRaw + " ]`");
                    embed.setThumbnail(yt_info.thumbnails[0].url);
                    embed.setAuthor({ name: "Added song" });
                    embed.setURL(yt_info.url);
                    embed.setColor(5763719);
                    _e.label = 27;
                case 27:
                    bot.client.channels.fetch(GuildAudio.textChannelID).then(function (channel) {
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
    }); }
};
function addSong(GuildAudio, song) {
    return __awaiter(this, void 0, void 0, function () {
        var video_data, songs;
        return __generator(this, function (_a) {
            video_data = {
                title: song.title,
                url: song.url,
                duration: song.durationRaw,
                thumbnail: song.thumbnails[0].url,
                channel: song.channel.name
            };
            songs = GuildAudio.songs;
            songs.set(songs.size, video_data);
            return [2];
        });
    });
}
