const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const isAdmin = require("../utils/admin");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Erstellt eine Umfrage")
        .addStringOption(o =>
            o.setName("frage")
             .setDescription("Frage (Zeilen mit Shift+Enter)")
             .setRequired(true)
        ),

    async execute(interaction) {
        if (!isAdmin(interaction.member)) {
            return interaction.reply({ content: "❌ Keine Rechte.", ephemeral: true });
        }

        const frage = interaction.options.getString("frage");

        const embed = new EmbedBuilder()
            .setTitle("📊 Umfrage")
            .setDescription(frage)
            .setColor("Purple")
            .setFooter({ text: "Landespolizei Düsseldorf" })
            .setThumbnail(interaction.client.user.displayAvatarURL());

        const msg = await interaction.reply({ embeds: [embed], fetchReply: true });

        await msg.react("✅");
        await msg.react("❌");
    }
};
