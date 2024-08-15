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
var functions_1 = require("../../util/functions");
var fs = require("fs");
var Builder = require("@discordjs/builders");
var guildsData = require("../../data/guilds.json");
module.exports = {
    name: "help",
    category: "info",
    permissions: [],
    alias: ["h"],
    description: "Provides information about all the bot commands",
    example: "help <command>",
    devOnly: false,
    run: function (bot, message, args) { return __awaiter(void 0, void 0, void 0, function () {
        var guildId, prefix, categories, commands, data, Embed, categoryName, category, command, Embed, commandName, aliases, perms, Embed;
        return __generator(this, function (_a) {
            guildId = message.guildId;
            if (Object.keys(guildsData).includes(guildId)) {
                prefix = guildsData[guildId]["prefix"];
            }
            else {
                (prefix = bot.prefix);
            }
            categories = fs.readdirSync("./dist/commands");
            commands = [];
            data = {};
            categories.forEach(function (category) {
                data[category] = [];
                (0, functions_1.getFiles)("./dist/commands/".concat(category), ".js").forEach(function (file) {
                    var command = require("../../commands/".concat(category, "/").concat(file));
                    if (command.devOnly)
                        return;
                    commands.push(file.replace(".js", ""));
                    data[category].push(file.replace(".js", ""));
                });
            });
            if (args.length != 0) {
                if (categories.includes(args[0])) {
                    Embed = new Builder.EmbedBuilder().setColor(9807270);
                    categoryName = args[0];
                    categoryName =
                        categoryName.charAt(0).toUpperCase() +
                            categoryName.slice(1).toLowerCase();
                    Embed.setTitle("__".concat(categoryName, "__"));
                    Embed.addFields({
                        name: "Commands",
                        value: "```" + data[args[0]].join("  ") + "```",
                    });
                    message.reply({ embeds: [Embed] });
                }
                else if (commands.includes(args[0])) {
                    category = Object.keys(data).find(function (key) {
                        return data[key].includes(args[0]);
                    });
                    command = require("../../commands/".concat(category, "/").concat(args[0]));
                    if (command.devOnly)
                        return [2];
                    Embed = new Builder.EmbedBuilder().setColor(9807270);
                    commandName = command.name;
                    commandName =
                        commandName.charAt(0).toUpperCase() +
                            commandName.slice(1).toLowerCase();
                    Embed.setTitle("__".concat(commandName, "__"));
                    Embed.setDescription(command.description);
                    Embed.addFields({
                        name: "Use",
                        value: "`" + prefix + command.example + "`",
                    });
                    aliases = "";
                    command.alias.forEach(function (name) {
                        aliases += name;
                    });
                    if (aliases.length != 0) {
                        Embed.addFields({ name: "Aliases", value: "`" + aliases + "`" });
                    }
                    perms = "";
                    command.alias.forEach(function (perm) {
                        aliases += perm;
                    });
                    if (perms.length == 0) {
                        perms = "`None`";
                    }
                    Embed.addFields({ name: "Necessary permissions", value: perms });
                    message.reply({ embeds: [Embed] });
                }
            }
            else {
                Embed = new Builder.EmbedBuilder()
                    .setColor(9807270)
                    .setTitle("Bot commands")
                    .addFields({
                    name: "Help menu",
                    value: "\nThe bot has ".concat(categories.length, " categories and ").concat(commands.length, " commands, feel free to try as many as you want \n\n Information about a category ").concat("`?help [category]`", " \n Information about a command ").concat("`?help [command]`"),
                }, {
                    name: "Categories",
                    value: "".concat("`").concat(prefix, "help ") +
                        categories.join("".concat("`", " \n ").concat("`").concat(prefix, "help ")) +
                        "`",
                });
                message.reply({ embeds: [Embed] });
            }
            return [2];
        });
    }); },
};
