import { Bot } from "../types";
import fs = require("fs")
import { getFiles } from "../util/functions";
import path = require("path")

module.exports = (bot: Bot, reload: boolean) => {
    
    const prodPath = path.resolve(__dirname, "..")
    const slashCommandsPath = path.join(prodPath, "slashcommands")

    fs.readdirSync(slashCommandsPath).forEach(category => {
        
        let slashCommands = getFiles(`${slashCommandsPath}/${category}`, ".js")

        slashCommands.forEach(f => {
            if (reload)
                delete require.cache[require.resolve(`${slashCommandsPath}/${category}/${f}`)]

            const slashCommand = require(`${slashCommandsPath}/${category}/${f}`)
            bot.slashCommands.set(slashCommand.data.name, slashCommand)

            console.log(`Slash Command: \u001B[35m ${category} \u001B[0m ~ \u001B[33m ${slashCommand.data.name} \u001b[0m ~ \u001B[32m Loaded \u001b[0m`)

        })
    })
}