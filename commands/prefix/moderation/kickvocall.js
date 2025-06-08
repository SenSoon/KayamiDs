import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'kickvocall',
  description: 'Déconnecte tous les membres d’un salon vocal.',
  async execute(message, args) {
    if (!hasAccess(message, 'MoveMembers')) {
      return message.reply('❌ Permission requise : `Déplacer les membres`.');
    }

    const channel = message.member.voice.channel;
    if (!channel) return message.reply('❌ Tu dois être dans un salon vocal.');

    try {
      let count = 0;
      for (const member of channel.members.values()) {
        await member.voice.disconnect();
        count++;
      }

      message.channel.send(`✅ ${count} membre(s) ont été déconnecté(s) du salon vocal.`);
    } catch (err) {
      console.error(err);
      message.reply('❌ Erreur lors de la déconnexion des membres.');
    }
  }
};
