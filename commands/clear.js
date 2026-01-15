const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");

const ADMIN_ROLE_ID = "1438923793073438733"; // deine Admin-Rolle

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("🧹 Löscht eine bestimmte Anzahl an Nachrichten")
        .addIntegerOption(option =>
            option
                .setName("anzahl")
                .setDescription("Wie viele Nachrichten sollen gelöscht werden? (1–100)")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        ),

    async execute(interaction) {
        // Rollen-Check
        if (!interaction.member.roles.cache.has(ADMIN_ROLE_ID)) {
            return interaction.reply({
                content: "❌ Du hast keine Berechtigung, diesen Command zu benutzen.",
                ephemeral: true
            });
        }

        const amount = interaction.options.getInteger("anzahl");

        try {
            const messages = await interaction.channel.bulkDelete(amount, true);

            const embed = new EmbedBuilder()
                .setColor(0x2ecc71)
                .setTitle("🧹 Nachrichten gelöscht")
                .setDescription(`✅ **${messages.size} Nachrichten** wurden erfolgreich gelöscht.`)
                .setFooter({
                    text: "Landespolizei Düsseldorf",
                    iconURL: interaction.client.user.displayAvatarURL()
                })
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });

        } catch (err) {
            console.error(err);
            await interaction.reply({
                content: "❌ Fehler beim Löschen der Nachrichten.",
                ephemeral: true
            });
        }
    }
};
