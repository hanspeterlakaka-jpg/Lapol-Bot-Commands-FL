const { SlashCommandBuilder } = require("discord.js");
const isAdmin = require("../utils/admin");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lockdown")
        .setDescription("Sperrt den Channel"),

    async execute(interaction) {
        if (!isAdmin(interaction.member)) {
            return interaction.reply({ content: "❌ Keine Rechte.", ephemeral: true });
        }

        await interaction.channel.permissionOverwrites.edit(
            interaction.guild.roles.everyone,
            { SendMessages: false }
        );

        await interaction.reply("🔒 Channel gesperrt.");
    }
};
