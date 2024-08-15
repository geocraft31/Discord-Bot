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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTimeout = exports.disconectBot = exports.playSong = exports.logger = exports.triggerEventHandler = exports.getFiles = void 0;
var fs = require("fs");
var Play = require("play-dl");
var Builder = require("@discordjs/builders");
var Voice = require("@discordjs/voice");
var getFiles = function (path, ending) {
    return fs.readdirSync(path).filter(function (f) { return f.endsWith(ending); });
};
exports.getFiles = getFiles;
var triggerEventHandler = function (bot, eventName) {
    var _a;
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var client = bot.client;
    try {
        if (bot.events.has(eventName))
            (_a = bot.events.get(eventName)).run.apply(_a, __spreadArray([bot], args, false));
        else
            throw new Error("Event ".concat(eventName, " does not exist"));
    }
    catch (err) {
        console.error(err);
    }
};
exports.triggerEventHandler = triggerEventHandler;
var logger = function (type, name) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var date = new Date;
    var hour = date.getHours(), minute = date.getMinutes(), second = date.getSeconds();
    var hourFormated = hour, minuteFormated = minute, secondFormated = second;
    if (hour < 10) {
        hourFormated = '0' + hour;
    }
    if (minute < 10) {
        minuteFormated = '0' + minute;
    }
    if (second < 10) {
        secondFormated = '0' + second;
    }
    var dateformat = '[ \x1b[32m' + [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear()
    ].join('/') + ' - ' + [
        hourFormated,
        minuteFormated,
        secondFormated
    ].join(':') + ' \x1b[0m]';
    if (args != "") {
        console.log("".concat(dateformat, " ~ ").concat(type, ": \u001B[33m").concat(name, "\u001B[0m (\u001B[36m ").concat(args.join(" "), " \u001B[0m)"));
    }
    else {
        console.log("".concat(dateformat, " ~ ").concat(type, ": \u001B[33m").concat(name, "\u001B[0m"));
    }
};
exports.logger = logger;
var playSong = function (song, bot, guildID) { return __awaiter(void 0, void 0, void 0, function () {
    var channelID, audioPlayer, title, duration, thumbnail, url, embed, stream, songResource;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                channelID = bot.audio.get(guildID).textChannelID;
                audioPlayer = bot.audio.get(guildID).player;
                title = song.title, duration = song.duration, thumbnail = song.thumbnail, url = song.url;
                embed = new Builder.EmbedBuilder();
                embed.setTitle(title);
                embed.setDescription("`[ 00:00 | " + duration + " ]`");
                embed.setThumbnail(thumbnail);
                embed.setAuthor({ name: "Now Playing" });
                embed.setURL(url);
                embed.setColor(1752220);
                return [4, Play.stream(url)];
            case 1:
                stream = _a.sent();
                songResource = Voice.createAudioResource(stream.stream, {
                    inputType: stream.type
                });
                audioPlayer.play(songResource);
                bot.client.channels.fetch(channelID).then(function (channel) {
                    channel.send({ embeds: [embed] });
                });
                return [2];
        }
    });
}); };
exports.playSong = playSong;
var disconectBot = function (bot, guildID) {
    var GuildAudio = bot.audio.get(guildID);
    GuildAudio.voiceConnection.disconnect();
    GuildAudio.subscription.unsubscribe();
    clearTimeout(GuildAudio.disconectInterval);
    GuildAudio.voiceConnection.removeAllListeners();
    GuildAudio.player.removeAllListeners();
    bot.audio.delete(guildID);
};
exports.disconectBot = disconectBot;
var createTimeout = function (bot, guildID) {
    return setTimeout(function () {
        (0, exports.disconectBot)(bot, guildID);
    }, 60 * 1000);
};
exports.createTimeout = createTimeout;
module.exports = {
    getFiles: exports.getFiles,
    playSong: exports.playSong,
    triggerEventHandler: exports.triggerEventHandler,
    logger: exports.logger,
    disconectBot: exports.disconectBot,
    createTimeout: exports.createTimeout
};
