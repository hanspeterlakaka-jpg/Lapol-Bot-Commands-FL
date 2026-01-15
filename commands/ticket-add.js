const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-add")
        .setDescription("Fügt User oder Rolle zum Ticket hinzu")
        .addUserOption(o =>
            o.setName("user")
             .setDescription("User hinzufügen")
        )
        .addRoleOption(o =>
            o.setName("rolle")
             .setDescription("Rolle hinzufügen")
        ),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const user = interaction.options.getUser("user");
        const role = interaction.options.getRole("rolle");

        if (!user && !role) {
            return interaction.editReply("❌ Bitte User oder Rolle angeben.");
        }

        if (user) {
            await interaction.channel.permissionOverwrites.edit(user.id, {
                ViewChannel: true,
                SendMessages: true
            });
        }

        if (role) {
            await interaction.channel.permissionOverwrites.edit(role.id, {
                ViewChannel: true,
                SendMessages: true
            });
        }

        const embed = new EmbedBuilder()
            .setDescription(`➕ Zugriff hinzugefügt`)
            .setColor("Green")
            .setFooter({ text: "Landespolizei Düsseldorf" })
            .setThumbnail(interaction.client.user.displayAvatarURL());

        await interaction.channel.send({ embeds: [embed] });
        await interaction.editReply("✅ Erfolgreich.");
    }
};
