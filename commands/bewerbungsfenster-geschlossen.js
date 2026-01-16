const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const isAdmin = require("../utils/admin");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bewerbungsfenster-geschlossen")
        .setDescription("Benachrichtigt, dass das Bewerbungsfenster geschlossen ist")
        .addStringOption(o =>
            o.setName("text")
             .setDescription("Bewerbungsfenster geschlossen Nachricht")
             .setRequired(true)
        ),

    async execute(interaction) {
        if (!isAdmin(interaction.member)) {
            return interaction.reply({ content: "❌ Keine Rechte.", ephemeral: true });
        }

        const text = interaction.options.getString("text");

        const embed = new EmbedBuilder()
            .setTitle("📢 Bewerbungsfenster geschlossen")
            .setDescription(text)
            .setColor("Blue")
            .setFooter({ text: "Landespolizei Düsseldorf" })
            .setThumbnail(interaction.client.user.displayAvatarURL());

        await interaction.reply({ embeds: [embed] });
    }
};
