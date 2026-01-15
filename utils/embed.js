const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Erstellt eine Umfrage")
        .addStringOption(option =>
            option
                .setName("question")
                .setDescription("Frage der Umfrage (\\n möglich)")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("options")
                .setDescription("Antworten, getrennt mit | (\\n möglich)")
                .setRequired(true)
        ),

    async execute(interaction) {
        const question = interaction.options
            .getString("question")
            .replace(/\\n/g, "\n");

        const optionsRaw = interaction.options
            .getString("options")
            .replace(/\\n/g, "\n");

        const options = optionsRaw.split("|").map(o => o.trim());

        const embed = new EmbedBuilder()
            .setTitle("📊 Umfrage")
            .setDescription(question)
            .addFields(
                options.map((opt, i) => ({
                    name: `Option ${i + 1}`,
                    value: opt,
                    inline: false
                }))
            )
            .setColor(0x5865f2)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
