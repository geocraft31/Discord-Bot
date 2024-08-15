"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var path = require("path");
var prodPath = path.resolve(__dirname);
require("dotenv").config({ path: path.resolve(prodPath, "../.env") });
var client = new Discord.Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent",
        "GuildMembers",
        "GuildVoiceStates",
    ],
});
var bot = {
    client: client,
    audio: new Discord.Collection(),
    prefix: "?",
    owners: ["581529736396931072"],
    events: new Discord.Collection(),
    commands: new Discord.Collection(),
    slashCommands: new Discord.Collection(),
};
var loadEvents = function (bot, reload) {
    return require(path.join(prodPath, "./handlers/events"))(bot, reload);
};
loadEvents(bot, false);
var loadCommands = function (bot, reload) {
    return require(path.join(prodPath, "./handlers/commands"))(bot, reload);
};
loadCommands(bot, false);
var loadSlashCommands = function (bot, reload) {
    return require(path.join(prodPath, "./handlers/slashcommands"))(bot, reload);
};
loadSlashCommands(bot, false);
client.login(process.env.TOKEN);
