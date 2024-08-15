"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = require("discord.js");
var Play = require("play-dl");
var path = require("path");
var prodPath = path.resolve(__dirname);
require("dotenv").config({ path: path.resolve(prodPath, "../.env") });
var client = new Discord.Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent",
        "GuildMembers",
        "GuildVoiceStates"
    ]
});
var bot = {
    client: client,
    audio: new Discord.Collection,
    prefix: "?",
    owners: ["581529736396931072"],
    events: new Discord.Collection,
    commands: new Discord.Collection,
    slashCommands: new Discord.Collection
};
var loadEvents = function (bot, reload) { return require(path.join(prodPath, "./handlers/events"))(bot, reload); };
loadEvents(bot, false);
var loadCommands = function (bot, reload) { return require(path.join(prodPath, "./handlers/commands"))(bot, reload); };
loadCommands(bot, false);
var loadSlashCommands = function (bot, reload) { return require(path.join(prodPath, "./handlers/slashcommands"))(bot, reload); };
loadSlashCommands(bot, false);
Play.setToken({
    spotify: {
        client_id: "766bd4e8c3be436cb757e6f1072e99e1",
        client_secret: process.env.CLIENT_SECRET,
        market: 'es',
        refresh_token: "AQATi9C1MoGKQZ0a5Z2gPI7Q54hfSz7Es_xUnCWiQ0OdHSY4avzah3NRcHQExyhR0yNWeIi4WXz9QeHLzbEhlktDOvd6g5wu5rwNlbHsTOmrpI10x5V_HmzlJJnw9MbQFEo"
    }
});
client.login(process.env.TOKEN);
