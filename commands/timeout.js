const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const isAdmin = require("../utils/admin");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("Timeout für einen User")
        .addUserOption(o =>
            o.setName("user")
             .setDescription("User")
             .setRequired(true)
        )
        .addIntegerOption(o =>
            o.setName("minuten")
             .setDescription("Dauer in Minuten")
             .setRequired(true)
        )
        .addStringOption(o =>
            o.setName("grund")
             .setDescription("Grund")
        ),

    async execute(interaction) {
        if (!isAdmin(interaction.member))
            return interaction.reply({ content: "❌ Keine Rechte.", ephemeral: true });

        const user = interaction.options.getUser("user");
        const minutes = interaction.options.getInteger("minuten");
        const reason = interaction.options.getString("grund") || "Kein Grund angegeben";

        const member = await interaction.guild.members.fetch(user.id);
        await member.timeout(minutes * 60 * 1000, reason);

        const embed = new EmbedBuilder()
            .setTitle("⏳ Timeout")
            .setDescription(`${user} wurde getimeoutet`)
            .addFields(
                { name: "Dauer", value: `${minutes} Minuten`, inline: true },
                { name: "Grund", value: reason, inline: true }
            )
            .setFooter({ text: "Landespolizei Düsseldorf" })
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setColor("Orange");

        await interaction.reply({ embeds: [embed] });
    }
};
