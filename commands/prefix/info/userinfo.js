export default {
  name: 'userinfo',
  description: 'Affiche les informations d’un membre.',
  async execute(message, args) {
    const member = message.mentions.members.first() || message.member;

    message.channel.send({
      embeds: [{
        color: 0x3498db,
        title: `👤 Informations de ${member.user.tag}`,
        thumbnail: { url: member.user.displayAvatarURL({ dynamic: true }) },
        fields: [
          { name: 'ID', value: member.id, inline: true },
          { name: 'Compte créé', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:D>`, inline: true },
          { name: 'Rejoint le serveur', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:D>`, inline: true },
          { name: 'Rôles', value: member.roles.cache.map(r => r.name).join(', ').slice(0, 1024) || 'Aucun' }
        ]
      }]
    });
  }
};

