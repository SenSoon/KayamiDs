import pkg from '../../../package.json' assert { type: 'json' };

export default {
  name: 'botinfo',
  description: 'Affiche les informations du bot.',
  async execute(message) {
    const uptime = process.uptime();
    const uptimeStr = new Date(uptime * 1000).toISOString().substr(11, 8);

    message.channel.send({
      embeds: [{
        color: 0xe67e22,
        title: '🤖 Informations sur le bot',
        fields: [
          { name: 'Nom', value: message.client.user.username, inline: true },
          { name: 'Version', value: pkg.version || '1.0.0', inline: true },
          { name: 'Uptime', value: uptimeStr, inline: true },
          { name: 'Serveurs', value: `${message.client.guilds.cache.size}`, inline: true },
          { name: 'Utilisateurs', value: `${message.client.users.cache.size}`, inline: true }
        ]
      }]
    });
  }
};
