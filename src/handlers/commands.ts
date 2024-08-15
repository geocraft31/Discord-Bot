import { Bot, Command } from "../types";
import fs = require("fs")
import { getFiles } from "../util/functions";
import path = require("path")

module.exports = (bot: Bot, reload: boolean) => {

    const prodPath = path.resolve(__dirname, "..")
    const commandsPath = path.join(prodPath, "commands")

    fs.readdirSync(commandsPath).forEach((category) => {

        let commands = getFiles(`${commandsPath}/${category}`, ".js")

        commands.forEach(f => {
            if (reload)
                delete require.cache[require.resolve(`${commandsPath}/${category}/${f}`)]
            
            const command: Command = require(`${commandsPath}/${category}/${f}`)
            bot.commands.set(command.name, command)

            console.log(`Command: \u001B[34m ${command.category} \u001B[0m ~ \u001B[33m ${command.name} \u001b[0m ~ \u001B[32m Loaded \u001b[0m`)

            command["alias"].forEach(alias => {
                bot.commands.set(alias, command)
            })
        })
    })
}