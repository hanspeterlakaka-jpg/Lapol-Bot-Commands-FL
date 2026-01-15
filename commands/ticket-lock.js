const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const SUPPORT_ROLES = [
    "1438923843174666401"
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-lock")
        .setDescription("🔒 Sperrt dieses Ticket (nur Support)"),

    async execute(interaction) {
        const channel = interaction.channel;
        const member = interaction.member;

        // 🔐 Permission Check
        if (!member.roles.cache.some(r => SUPPORT_ROLES.includes(r.id))) {
            return interaction.reply({
                content: "❌ Dafür hast du keine Berechtigung.",
                ephemeral: true
            });
        }

        // 🔒 @everyone blockieren
        await channel.permissionOverwrites.edit(
            interaction.guild.roles.everyone,
            {
                SendMessages: false,
                AddReactions: false
            }
        );

        // ✅ Support darf weiter schreiben
        for (const roleId of SUPPORT_ROLES) {
            await channel.permissionOverwrites.edit(roleId, {
                SendMessages: true,
                AddReactions: true
            });
        }

        const embed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle("🔒 Ticket gesperrt")
            .setDescription(
                "Dieses Ticket wurde gesperrt.\n\n" +
                "🛑 **Der Ticket-Ersteller kann nicht mehr schreiben**\n" +
                "✅ **Support kann weiterhin antworten**"
            )
            .setFooter({ text: "Landespolizei Düsseldorf" })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
