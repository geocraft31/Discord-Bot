"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../util/functions");
var Discord = require("discord.js");
var path = require("path");
module.exports = function (bot, reload) {
    var prodPath = path.resolve(__dirname, "..");
    var eventsPath = path.join(prodPath, "events");
    var events = (0, functions_1.getFiles)(eventsPath, ".js");
    if (events.length === 0) {
        console.log("No events to load");
    }
    events.forEach(function (f, i) {
        if (reload)
            delete require.cache[require.resolve("".concat(eventsPath, "/").concat(f))];
        var event = require("".concat(eventsPath, "/").concat(f));
        bot.events.set(event.name, event);
        console.log("Event: \u001B[33m ".concat(event.name, " \u001B[0m ~ \u001B[32m Loaded \u001B[0m"));
    });
    if (!reload)
        initEvents(bot);
};
function initEvents(bot) {
    var client = bot.client;
    client.on("ready", function () {
        (0, functions_1.triggerEventHandler)(bot, "ready");
    });
    client.on("messageCreate", function (message) {
        (0, functions_1.triggerEventHandler)(bot, "messageCreate", message);
    });
    client.on("guildCreate", function (guild) {
        (0, functions_1.triggerEventHandler)(bot, "guildCreate", guild);
    });
    client.on(Discord.Events.InteractionCreate, function (interaction) {
        if (!interaction.isChatInputCommand())
            return;
        (0, functions_1.triggerEventHandler)(bot, "interactionCreate", interaction);
    });
}
