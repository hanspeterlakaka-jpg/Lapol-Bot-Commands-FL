const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const isTeam = require("../utils/isTicketTeam");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-remind")
        .setDescription("Erstellt eine Erinnerung")
        .addIntegerOption(o =>
            o.setName("minuten")
             .setDescription("Zeit in Minuten")
             .setRequired(true)
        ),

    async execute(interaction) {
        if (!isTeam(interaction.member))
            return interaction.reply({ content: "❌ Keine Rechte.", ephemeral: true });

        const min = interaction.options.getInteger("minuten");

        await interaction.reply({ content: "⏰ Erinnerung gesetzt.", ephemeral: true });

        setTimeout(async () => {
            await interaction.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("⏰ Ticket Erinnerung")
                        .setFooter({ text: "Landespolizei Düsseldorf" })
                        .setThumbnail(interaction.client.user.displayAvatarURL())
                ]
            });
        }, min * 60 * 1000);
    }
};
