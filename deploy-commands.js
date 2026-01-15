require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

const usedNames = new Set();

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (!command.data || !command.execute) {
        console.warn(`⏭️ Übersprungen: ${file}`);
        continue;
    }

    const json = command.data.toJSON();
    const name = json.name;

    if (usedNames.has(name)) {
        console.error(`❌ DOPPELTER COMMAND-NAME: "${name}" → Datei: ${file}`);
        process.exit(1);
    }

    usedNames.add(name);
    console.log(`✅ ${file} → /${name}`);
    commands.push(json);
}


const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log("🔄 Registriere Slash Commands...");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log("✅ Slash Commands erfolgreich registriert.");
    } catch (err) {
        console.error("❌ Fehler beim Deploy:", err);
    }
})();
