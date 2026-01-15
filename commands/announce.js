const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const isAdmin = require("../utils/admin");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("announce")
        .setDescription("Erstellt eine Ankündigung")
        .addStringOption(o =>
            o.setName("text")
             .setDescription("Ankündigungstext")
             .setRequired(true)
        ),

    async execute(interaction) {
        if (!isAdmin(interaction.member)) {
            return interaction.reply({ content: "❌ Keine Rechte.", ephemeral: true });
        }

        const text = interaction.options.getString("text");

        const embed = new EmbedBuilder()
            .setTitle("📢 Ankündigung")
            .setDescription(text)
            .setColor("Blue")
            .setFooter({ text: "Landespolizei Düsseldorf" })
            .setThumbnail(interaction.client.user.displayAvatarURL());

        await interaction.reply({ embeds: [embed] });
    }
};
