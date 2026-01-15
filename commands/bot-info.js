const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bot-info")
        .setDescription("Zeigt Bot-Infos"),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("🤖 Bot Informationen")
            .addFields(
                { name: "Name", value: interaction.client.user.username, inline: true },
                { name: "Server", value: `${interaction.guild.memberCount}`, inline: true }
            )
            .setColor("Green")
            .setFooter({ text: "Landespolizei Düsseldorf" })
            .setThumbnail(interaction.client.user.displayAvatarURL());

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
