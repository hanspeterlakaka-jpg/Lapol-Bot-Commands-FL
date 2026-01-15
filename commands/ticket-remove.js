const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const isTeam = require("../utils/isTicketTeam");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-remove")
        .setDescription("Entfernt User oder Rolle")
        .addUserOption(o => o.setName("user").setDescription("User"))
        .addRoleOption(o => o.setName("rolle").setDescription("Rolle")),

    async execute(interaction) {
        if (!isTeam(interaction.member))
            return interaction.reply({ content: "❌ Keine Rechte.", ephemeral: true });

        const user = interaction.options.getUser("user");
        const role = interaction.options.getRole("rolle");

        if (user) await interaction.channel.permissionOverwrites.delete(user.id);
        if (role) await interaction.channel.permissionOverwrites.delete(role.id);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("➖ Zugriff entfernt")
                    .setFooter({ text: "Landespolizei Düsseldorf" })
                    .setThumbnail(interaction.client.user.displayAvatarURL())
            ]
        });
    }
};
