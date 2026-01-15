const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const isTeam = require("../utils/isTicketTeam");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-note")
        .setDescription("Interne Notiz")
        .addStringOption(o =>
            o.setName("text")
             .setDescription("Notiz")
             .setRequired(true)
        ),

    async execute(interaction) {
        if (!isTeam(interaction.member))
            return interaction.reply({ content: "❌ Keine Rechte.", ephemeral: true });

        const text = interaction.options.getString("text");

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("📝 Interne Notiz")
                    .setDescription(text)
                    .setColor("Orange")
                    .setFooter({ text: "Landespolizei Düsseldorf" })
                    .setThumbnail(interaction.client.user.displayAvatarURL())
            ]
        });
    }
};
