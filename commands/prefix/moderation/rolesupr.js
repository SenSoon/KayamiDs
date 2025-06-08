import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'rolesupr',
  description: 'Supprimer un rôle mentionné',
  async execute(message, args) {
    if (!hasAccess(message, 'ManageRoles')) {
      return message.reply("❌ Tu n'as pas la permission de supprimer des rôles.");
    }

    const role = message.mentions.roles.first();
    if (!role) {
      return message.reply('❗ Tu dois mentionner un rôle à supprimer.');
    }

    try {
      await role.delete(`Supprimé par ${message.author.tag}`);
      message.reply(`🗑️ Rôle **${role.name}** supprimé.`);
    } catch (err) {
      console.error(err);
      message.reply('❌ Impossible de supprimer ce rôle (peut-être plus haut que le bot ?).');
    }
  }
};
