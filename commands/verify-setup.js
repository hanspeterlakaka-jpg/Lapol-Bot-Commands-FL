const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const isAdmin = require("../utils/admin");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("verify-setup")
        .setDescription("Erstellt ein Verifizierungs-System"),

    async execute(interaction) {
        if (!isAdmin(interaction.member))
            return interaction.reply({ content: "❌ Keine Rechte.", ephemeral: true });

        const embed = new EmbedBuilder()
            .setTitle("✅ Verifizierung")
            .setDescription("Klicke auf den Button, um dich zu verifizieren.")
            .setFooter({ text: "Landespolizei Düsseldorf" })
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setColor("Green");

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("verify_button")
                .setLabel("Verifizieren")
                .setStyle(ButtonStyle.Success)
        );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
};
