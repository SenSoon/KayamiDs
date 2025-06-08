import fs from 'fs';
import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'restorebackup',
  description: 'Restaure les rôles et salons à partir d’un fichier de backup.',
  async execute(message, args) {
    if (!hasAccess(message, 'Administrator')) {
      return message.reply("Tu n'as pas la permission.");
    }

    const backupFile = './data/backup.json';

    if (!fs.existsSync(backupFile)) {
      return message.reply("❌ Aucun fichier de backup trouvé.");
    }

    const backup = JSON.parse(fs.readFileSync(backupFile));

    // 🔄 Restaurer les rôles
    for (const roleData of backup.roles.reverse()) {
      if (message.guild.roles.cache.find(r => r.name === roleData.name)) continue;
      await message.guild.roles.create({
        name: roleData.name,
        color: roleData.color,
        permissions: BigInt(roleData.permissions),
        mentionable: roleData.mentionable,
        hoist: roleData.hoist
      }).catch(() => {});
    }

    // 🔄 Restaurer les salons
    for (const channelData of backup.channels) {
      if (message.guild.channels.cache.find(c => c.name === channelData.name)) continue;
      await message.guild.channels.create({
        name: channelData.name,
        type: channelData.type,
        topic: channelData.topic || null
      }).catch(() => {});
    }

    return message.reply("✅ Rôles et salons restaurés depuis la sauvegarde.");
  }
};
