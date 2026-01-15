module.exports = {
    name: "interactionCreate",

    async execute(interaction, client) {

        /* ───── Slash Commands ───── */
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);

                if (!interaction.replied && !interaction.deferred) {
                    await interaction.reply({
                        content: "❌ Fehler beim Ausführen des Commands.",
                        ephemeral: true
                    });
                }
            }
        }

        /* ───── Button Interactions (Poll) ───── */
        if (interaction.isButton()) {

            if (interaction.customId === "yes" || interaction.customId === "no") {
                const vote = interaction.customId === "yes" ? "Ja 👍" : "Nein 👎";

                await interaction.reply({
                    content: `🗳️ Deine Stimme (**${vote}**) wurde gezählt.`,
                    ephemeral: true
                });
            }
        }
    }
};
