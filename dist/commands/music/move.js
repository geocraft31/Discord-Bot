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
    name: "move",
    category: "music",
    permissions: [],
    alias: [],
    description: "Moves a song to another position",
    example: "move <position of the song> <new position>",
    devOnly: false,
    run: function (bot, message, args) { return __awaiter(void 0, void 0, void 0, function () {
        var audio, songs, songIndex, songPos, oldSong, movedSong, embed_1;
        return __generator(this, function (_a) {
            try {
                audio = bot.audio;
                songs = audio.get(message.guildId).songs;
                songIndex = Number(args[0]);
                songPos = Number(args[1]);
                if (Number.isNaN(songIndex) === true || Number.isNaN(songPos) === true) {
                    return [2, message.channel.send("Please enter two numbers")];
                }
                if (songIndex > songs.size || songPos > songs.size) {
                    return [2, message.channel.send("The number is too big")];
                }
                oldSong = songs.get(songPos);
                movedSong = songs.get(songIndex);
                songs.set(songPos, movedSong);
                songs.set(songIndex, oldSong);
                embed_1 = new Builder.EmbedBuilder();
                embed_1.setDescription("Moved song: ".concat(movedSong.title, " \n To position ").concat(songPos));
                embed_1.setColor(15548997);
                bot.client.channels
                    .fetch(audio.get(message.guildId).textChannelID)
                    .then(function (channel) {
                    channel.send({ embeds: [embed_1] });
                });
                message.channel.send("song moved");
            }
            catch (_b) {
                message.channel.send("no song");
            }
            return [2];
        });
    }); },
};
