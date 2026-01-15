const { SlashCommandBuilder } = require("discord.js");
const isAdmin = require("../utils/admin");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Lädt Commands neu"),

    async execute(interaction) {
        if (!isAdmin(interaction.member)) {
            return interaction.reply({ content: "❌ Keine Rechte.", ephemeral: true });
        }

        interaction.client.commands.clear();
        require("../index");

        await interaction.reply({ content: "🔄 Commands neu geladen.", ephemeral: true });
    }
};
