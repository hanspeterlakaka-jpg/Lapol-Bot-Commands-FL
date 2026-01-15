const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const isAdmin = require("../utils/admin");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Verwarnt einen User")
        .addUserOption(o =>
            o.setName("user")
             .setDescription("User")
             .setRequired(true)
        )
        .addStringOption(o =>
            o.setName("grund")
             .setDescription("Grund")
             .setRequired(true)
        ),

    async execute(interaction) {
        if (!isAdmin(interaction.member))
            return interaction.reply({ content: "❌ Keine Rechte.", ephemeral: true });

        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("grund");

        const embed = new EmbedBuilder()
            .setTitle("⚠️ Verwarnung")
            .setDescription(`${user} wurde verwarnt`)
            .addFields({ name: "Grund", value: reason })
            .setColor("Red")
            .setFooter({ text: "Landespolizei Düsseldorf" })
            .setThumbnail(interaction.client.user.displayAvatarURL());

        await interaction.reply({ embeds: [embed] });

        // optional DM
        try {
            await user.send(`⚠️ Du wurdest verwarnt:\n${reason}`);
        } catch {}
    }
};
