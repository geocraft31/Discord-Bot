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
var Builder = require("@discordjs/builders");
module.exports = {
    name: "queue",
    category: "music",
    permissions: [],
    alias: ["q"],
    description: "Displays all of the songs added to the bot",
    example: "queue",
    devOnly: false,
    run: function (bot, message, args) { return __awaiter(void 0, void 0, void 0, function () {
        var client, audio, songs, _a, embed, embedDescription, firstSong, firstSongField, length, length, i, song;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    client = bot.client, audio = bot.audio;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 2, , 4]);
                    songs = audio.get(message.guildId).songs;
                    return [3, 4];
                case 2:
                    _a = _b.sent();
                    return [4, message.reply("No songs in the playlist, try adding some music before running this command")];
                case 3:
                    _b.sent();
                    return [2];
                case 4:
                    embed = new Builder.EmbedBuilder();
                    embedDescription = "";
                    firstSong = songs.first();
                    firstSongField = "[".concat(firstSong.title, "](").concat(firstSong.url, ") \n ").concat(firstSong.channel, " [").concat(firstSong.duration, "]");
                    embed.setAuthor({ name: "Playlist" });
                    embed.setThumbnail(firstSong.thumbnail);
                    embed.setColor(1146986);
                    embedDescription += "**Now playing:** \n".concat(firstSongField, " \n\n");
                    if (songs.size > 25) {
                        length = 24;
                    }
                    else {
                        length = songs.size;
                    }
                    for (i = 1; i < length; i++) {
                        song = songs.get(i);
                        embedDescription += "".concat(i, " - [").concat(song.title, "](").concat(song.url, ") \n ").concat(song.channel, " [").concat(song.duration, "] \n\n");
                    }
                    embed.setDescription(embedDescription);
                    return [4, message.channel.send({ embeds: [embed] })];
                case 5:
                    _b.sent();
                    return [2];
            }
        });
    }); }
};
