import fs from 'fs';
import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'backup',
  description: 'Crée un backup des rôles et salons.',
  async execute(message) {
    if (!hasAccess(message, 'Administrator')) {
      return message.reply("Tu n'as pas la permission.");
    }

    const roles = message.guild.roles.cache
      .filter(r => !r.managed && r.id !== message.guild.id)
      .map(r => ({
        name: r.name,
        color: r.hexColor,
        permissions: r.permissions.bitfield.toString(),
        mentionable: r.mentionable,
        hoist: r.hoist
      }));

    const channels = message.guild.channels.cache
      .filter(c => c.type === 0 || c.type === 2 || c.type === 4) // texte, voix, catégorie
      .map(c => ({
        name: c.name,
        type: c.type,
        topic: c.topic || null
      }));

    const backup = { roles, channels };

    fs.writeFileSync('./data/backup.json', JSON.stringify(backup, null, 2));
    return message.reply("💾 Backup enregistré avec succès dans `data/backup.json`.");
  }
};
