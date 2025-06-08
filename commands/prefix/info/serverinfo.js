export default {
  name: 'serverinfo',
  description: 'Affiche les informations du serveur.',
  async execute(message) {
    const { guild } = message;

    message.channel.send({
      embeds: [{
        color: 0x2ecc71,
        title: `🏠 Informations de ${guild.name}`,
        thumbnail: { url: guild.iconURL({ dynamic: true }) },
        fields: [
          { name: 'ID', value: guild.id, inline: true },
          { name: 'Créé le', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
          { name: 'Propriétaire', value: `<@${guild.ownerId}>`, inline: true },
          { name: 'Membres', value: `${guild.memberCount}`, inline: true },
          { name: 'Salons', value: `${guild.channels.cache.size}`, inline: true },
          { name: 'Rôles', value: `${guild.roles.cache.size}`, inline: true }
        ]
      }]
    });
  }
};
