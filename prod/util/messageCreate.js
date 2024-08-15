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
var guildData = require("./../data/guilds.json");
module.exports = {
    name: "messageCreate",
    run: function (bot, message) { return __awaiter(void 0, void 0, void 0, function () {
        var prefix, prefix, args, cmdstr, command, member, date, dateformat, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (Object.keys(guildData).includes(message.guildId)) {
                        prefix = guildData[message.guildId].prefix;
                    }
                    else {
                        prefix = bot.prefix;
                    }
                    if (!message.guild)
                        return [2 /*return*/];
                    if (message.author.bot)
                        return [2 /*return*/];
                    if (!message.content.startsWith(prefix))
                        return [2 /*return*/];
                    args = message.content.slice(prefix.length).trim().split(" ");
                    cmdstr = args.shift().toLowerCase();
                    command = bot.commands.get(cmdstr);
                    if (!command)
                        return [2 /*return*/];
                    member = message.member;
                    if (command.devOnly && !bot.owners.includes(member.id)) {
                        return [2 /*return*/, message.reply("This command is only available to the bot owners")];
                    }
                    if (command.permissions && member.permissions.missing(command.permissions).length !== 0) {
                        return [2 /*return*/, message.reply("You do not have permissions to use this command")];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    date = new Date;
                    dateformat = '[ \x1b[32m' + [
                        date.getDate(),
                        date.getMonth() + 1,
                        date.getFullYear()
                    ].join('/') + ' - ' + [
                        date.getHours(),
                        date.getMinutes(),
                        date.getSeconds()
                    ].join(':') + ' \x1b[0m]';
                    console.log("".concat(dateformat, " ~ Command: \u001B[33m").concat(command.name, "\u001B[0m (\u001B[36m ").concat(args.join(" "), " \u001B[0m)"));
                    return [4 /*yield*/, command.run(bot, message, args)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }
};
