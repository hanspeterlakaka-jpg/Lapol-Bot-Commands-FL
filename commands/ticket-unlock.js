const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const SUPPORT_ROLES = [
    "1438923843174666401"
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-unlock")
        .setDescription("🔓 Entsperrt dieses Ticket (nur Support)"),

    async execute(interaction) {
        const channel = interaction.channel;
        const member = interaction.member;

        if (!member.roles.cache.some(r => SUPPORT_ROLES.includes(r.id))) {
            return interaction.reply({
                content: "❌ Dafür hast du keine Berechtigung.",
                ephemeral: true
            });
        }

        await channel.permissionOverwrites.edit(
            interaction.guild.roles.everyone,
            {
                SendMessages: true,
                AddReactions: true
            }
        );

        const embed = new EmbedBuilder()
            .setColor(0x00ff99)
            .setTitle("🔓 Ticket entsperrt")
            .setDescription("Das Ticket ist wieder geöffnet.")
            .setFooter({ text: "Landespolizei Düsseldorf" })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
