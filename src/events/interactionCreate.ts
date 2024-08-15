import { Bot } from "../types";
import Discord = require("discord.js")
import { logger } from "./../util/functions"

module.exports = {
    name: "interactionCreate",
    run: async (bot: Bot, interaction: Discord.ChatInputCommandInteraction) => {

        const command = bot.slashCommands.get(interaction.commandName)
        
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return interaction.reply("No command found");
        }

        try {

            logger("Slash command", command.data.name)

            await command.execute(interaction, bot);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }

    }
}