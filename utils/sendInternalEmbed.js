const { PermissionFlagsBits } = require("discord.js");
const { SUPPORT_ROLES } = require("../config/ticketRoles");

module.exports = async (channel, embed) => {
    if (!channel || !channel.guild) return;

    // Nachricht senden
    const msg = await channel.send({ embeds: [embed] });

    // @everyone ID
    const everyoneId = channel.guild.roles.everyone.id;

    // User kurz ausblenden
    await channel.permissionOverwrites.edit(everyoneId, {
        ViewChannel: false
    });

    // Support-Rollen explizit erlauben
    for (const roleId of SUPPORT_ROLES) {
        await channel.permissionOverwrites.edit(roleId, {
            ViewChannel: true
        });
    }

    // Sichtbarkeit wiederherstellen (User hat es nie gesehen)
    setTimeout(async () => {
        await channel.permissionOverwrites.edit(everyoneId, {
            ViewChannel: true
        });
    }, 300);
};
