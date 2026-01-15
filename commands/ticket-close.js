const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-close")
        .setDescription("Schließt das Ticket"),

    async execute(interaction) {
        await interaction.reply({ content: "🔒 Ticket wird geschlossen...", ephemeral: true });

        await interaction.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle("🔒 Ticket geschlossen")
                    .setFooter({ text: "Landespolizei Düsseldorf" })
                    .setThumbnail(interaction.client.user.displayAvatarURL())
            ]
        });

        setTimeout(() => interaction.channel.delete(), 3000);
    }
};
