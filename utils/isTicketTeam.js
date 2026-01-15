const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const isTeam = require("../utils/isTicketTeam");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-autoclose")
        .setDescription("Schließt Ticket nach Inaktivität")
        .addIntegerOption(o =>
            o.setName("minuten")
             .setDescription("Inaktivität in Minuten")
             .setRequired(true)
        ),

    async execute(interaction) {
        if (!isTeam(interaction.member))
            return interaction.reply({ content: "❌ Keine Rechte.", ephemeral: true });

        const min = interaction.options.getInteger("minuten");

        await interaction.reply({ content: "⏳ AutoClose aktiviert.", ephemeral: true });

        setTimeout(async () => {
            if (interaction.channel) {
                await interaction.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("⏱ Ticket geschlossen")
                            .setDescription("Ticket wegen Inaktivität geschlossen.")
                            .setFooter({ text: "Landespolizei Düsseldorf" })
                            .setThumbnail(interaction.client.user.displayAvatarURL())
                    ]
                });
                await interaction.channel.delete();
            }
        }, min * 60 * 1000);
    }
};
