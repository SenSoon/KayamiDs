import { hasAccess } from '../../../utils/hasAccess.js';
import { ComponentType } from 'discord.js';

export default {
  name: 'delsalon',
  description: 'Supprimer un salon texte ou vocal (avec confirmation)',
  async execute(message, args) {
    if (!hasAccess(message, 'ManageChannels')) {
      return message.reply("❌ Tu n'as pas la permission de supprimer un salon.");
    }

    const salon = message.mentions.channels.first();
    if (!salon) return message.reply('❗ Tu dois mentionner un salon à supprimer.');

    const confirmationMessage = await message.reply({
      content: `⚠️ Es-tu sûr de vouloir supprimer le salon **#${salon.name}** ? (tu as 15 secondes)`,
    });

    try {
      const filter = (m) =>
        m.author.id === message.author.id &&
        ['oui', 'non'].includes(m.content.toLowerCase());

      const collected = await message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] });
      const response = collected.first().content.toLowerCase();

      if (response === 'oui') {
        await salon.delete();
        message.reply(`🗑️ Salon **#${salon.name}** supprimé.`);
      } else {
        message.reply('❎ Suppression annulée.');
      }
    } catch (err) {
      message.reply('⏱️ Temps écoulé. Suppression annulée.');
    }
  }
};
