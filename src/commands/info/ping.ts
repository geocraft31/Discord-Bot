import { Bot } from "../../types";
import Discord = require("discord.js")

module.exports = {
    name: "ping",
    category: "info",
    permissions: [],
    alias: [],
    description: "Calculates `bot` and `API` latency",
    example: "ping <command>",
    devOnly: false,
    run: async (bot: Bot, message:Discord.Message, args) => {
        message.reply("Calculating ping...").then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit(`Bot latency: **${ping}**, API latency: **${bot.client.ws.ping}**`)
        })
    }
}