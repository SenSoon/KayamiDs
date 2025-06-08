import { hasAccess } from '../../../utils/hasAccess.js';
import fs from 'fs';
import path from 'path';

const logPath = path.resolve('./data/modlog.json');

export default {
  name: 'resetwarn',
  description: 'Supprime tous les avertissements d’un membre.',
  async execute(message, args) {
    if (!hasAccess(message, 'ManageMessages')) {
      return message.reply("❌ Permission requise : `Gérer les messages`.");
    }

    const member = message.mentions.users.first();
    if (!member) return message.reply("❌ Utilisation : `+resetwarn @membre`");

    if (!fs.existsSync(logPath)) return message.reply("ℹ️ Aucun avertissement enregistré.");

    const data = JSON.parse(fs.readFileSync(logPath, 'utf8'));

    if (!data[member.id]) return message.reply("ℹ️ Ce membre n’a aucun avertissement.");

    delete data[member.id];
    fs.writeFileSync(logPath, JSON.stringify(data, null, 2));

    message.channel.send(`✅ Tous les avertissements de ${member.tag} ont été supprimés.`);
  }
};
