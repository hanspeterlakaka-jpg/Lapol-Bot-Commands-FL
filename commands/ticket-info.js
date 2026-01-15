const {
    SlashCommandBuilder,
    EmbedBuilder,
    ChannelType
} = require("discord.js");

const ADMIN_ROLE_ID = "1438923793073438733"; // Admin-Rolle

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-info")
        .setDescription("ℹ️ Zeigt detaillierte Informationen zu diesem Ticket"),

    async execute(interaction) {
        // Nur in Textkanälen
        if (interaction.channel.type !== ChannelType.GuildText) {
            return interaction.reply({
                content: "❌ Dieser Command kann nur in Ticket-Textkanälen genutzt werden.",
                ephemeral: true
            });
        }

        // Admin-Check
        if (!interaction.member.roles.cache.has(ADMIN_ROLE_ID)) {
            return interaction.reply({
                content: "❌ Du hast keine Berechtigung für diesen Command.",
                ephemeral: true
            });
        }

        const channel = interaction.channel;

        // Ticket-Owner aus Channel-Topic lesen
        let ownerText = "❓ Unbekannt";
        if (channel.topic && channel.topic.includes("UserID:")) {
            const userId = channel.topic.split("UserID:")[1]?.trim();
            if (userId) ownerText = `<@${userId}>`;
        }

        // Ersteller-Zeitpunkt
        const createdAt = `<t:${Math.floor(channel.createdTimestamp / 1000)}:F>`;

        // Mitglieder mit Zugriff
        const membersWithAccess = channel.permissionOverwrites.cache
            .filter(p => p.type === 1 && p.allow.has("ViewChannel"))
            .map(p => `<@${p.id}>`)
            .join(", ") || "Keine";

        const embed = new EmbedBuilder()
            .setColor(0x3498db)
            .setTitle("🎫 Ticket-Informationen")
            .setDescription(
                "**Landespolizei Düsseldorf**\n\n" +
                "Hier findest du alle wichtigen Informationen zu diesem Ticket."
            )
            .addFields(
                {
                    name: "📛 Ticket-Name",
                    value: `\`${channel.name}\``,
                    inline: true
                },
                {
                    name: "👤 Ticket-Ersteller",
                    value: ownerText,
                    inline: true
                },
                {
                    name: "🆔 Channel-ID",
                    value: channel.id,
                    inline: false
                },
                {
                    name: "📅 Erstellt am",
                    value: createdAt,
                    inline: false
                },
                {
                    name: "👥 Zugriffsberechtigte Nutzer",
                    value: membersWithAccess,
                    inline: false
                },
                {
                    name: "🔒 Status",
                    value: channel.permissionOverwrites.cache.some(p =>
                        p.id === interaction.guild.roles.everyone.id &&
                        !p.allow.has("SendMessages")
                    )
                        ? "🔒 **Gesperrt**"
                        : "🔓 **Offen**",
                    inline: true
                }
            )
            .setFooter({
                text: "Landespolizei Düsseldorf",
                iconURL: interaction.client.user.displayAvatarURL()
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
