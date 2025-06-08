import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'kickvoc',
  description: 'Déconnecte un membre d’un salon vocal.',
  async execute(message, args) {
    if (!hasAccess(message, 'MoveMembers')) {
      return message.reply('❌ Permission requise : `Déplacer les membres`.');
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply('❌ Utilisation : `+kickvoc @membre`');

    if (!member.voice.channel) {
      return message.reply('ℹ️ Ce membre n’est pas en vocal.');
    }

    try {
      await member.voice.disconnect();
      message.channel.send(`✅ ${member.user.tag} a été déconnecté du vocal.`);
    } catch (err) {
      console.error(err);
      message.reply('❌ Erreur lors de la déconnexion du membre.');
    }
  }
};
