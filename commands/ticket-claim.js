const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const isTeam = require("../utils/isTicketTeam");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-claim")
        .setDescription("Übernimmt das Ticket"),

    async execute(interaction) {
        if (!isTeam(interaction.member))
            return interaction.reply({ content: "❌ Keine Rechte.", ephemeral: true });

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("👮 Ticket übernommen")
                    .setDescription(`Bearbeitet von ${interaction.user}`)
                    .setFooter({ text: "Landespolizei Düsseldorf" })
                    .setThumbnail(interaction.client.user.displayAvatarURL())
            ]
        });
    }
};
