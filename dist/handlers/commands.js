"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var functions_1 = require("../util/functions");
var path = require("path");
module.exports = function (bot, reload) {
    var prodPath = path.resolve(__dirname, "..");
    var commandsPath = path.join(prodPath, "commands");
    fs.readdirSync(commandsPath).forEach(function (category) {
        var commands = (0, functions_1.getFiles)("".concat(commandsPath, "/").concat(category), ".js");
        commands.forEach(function (f) {
            if (reload)
                delete require.cache[require.resolve("".concat(commandsPath, "/").concat(category, "/").concat(f))];
            var command = require("".concat(commandsPath, "/").concat(category, "/").concat(f));
            bot.commands.set(command.name, command);
            console.log("Command: \u001B[34m ".concat(command.category, " \u001B[0m ~ \u001B[33m ").concat(command.name, " \u001B[0m ~ \u001B[32m Loaded \u001B[0m"));
            command["alias"].forEach(function (alias) {
                bot.commands.set(alias, command);
            });
        });
    });
};
