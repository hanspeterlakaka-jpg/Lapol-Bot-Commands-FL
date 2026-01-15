const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Zeigt User Informationen")
        .addUserOption(o =>
            o.setName("user")
             .setDescription("User")
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("user") || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);

        const embed = new EmbedBuilder()
            .setTitle("👤 User Info")
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: "Name", value: user.tag, inline: true },
                { name: "ID", value: user.id, inline: true },
                { name: "Beigetreten", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` }
            )
            .setFooter({ text: "Landespolizei Düsseldorf" })
            .setColor("Blue");

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
