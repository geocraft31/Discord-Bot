import Discord = require("discord.js");
import path = require("path");

const prodPath = path.resolve(__dirname);

require("dotenv").config({ path: path.resolve(prodPath, "../.env") });

const client = new Discord.Client({
  intents: [
    "Guilds",
    "GuildMessages",
    "MessageContent",
    "GuildMembers",
    "GuildVoiceStates",
  ],
});

let bot = {
  client,
  audio: new Discord.Collection(),
  prefix: "?",
  owners: ["581529736396931072"],
  events: new Discord.Collection(),
  commands: new Discord.Collection(),
  slashCommands: new Discord.Collection(),
};
const loadEvents = (bot: object, reload: boolean) =>
  require(path.join(prodPath, "./handlers/events"))(bot, reload);
loadEvents(bot, false);

const loadCommands = (bot: object, reload: boolean) =>
  require(path.join(prodPath, "./handlers/commands"))(bot, reload);
loadCommands(bot, false);

const loadSlashCommands = (bot: object, reload: boolean) =>
  require(path.join(prodPath, "./handlers/slashcommands"))(bot, reload);
loadSlashCommands(bot, false);

client.login(process.env.TOKEN);
