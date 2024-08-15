import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, bot) {
        const { client } = bot
        try {
            const msg = await interaction.reply({ content: `Calculating Ping...`, fetchReply: true, ephemeral: true });
            await interaction.editReply({ content: `Bot Latency: \`${msg.createdTimestamp - interaction.createdTimestamp}ms\`, Wbsocket Latency: \`${client.ws.ping}ms\``, ephemeral: true })

        } catch (err) {
            console.log("Something Went Wrong => ", err);
        }
    }
}