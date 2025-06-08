import { hasAccess } from '../../../utils/hasAccess.js';
import fs from 'fs';
import path from 'path';

const logPath = path.resolve('./data/modlog.json');

export default {
  name: 'removewarn',
  description: 'Supprime un avertissement spécifique.',
  async execute(message, args) {
    if (!hasAccess(message, 'ManageMessages')) {
      return message.reply("❌ Permission requise : `Gérer les messages`.");
    }

    const member = message.mentions.users.first();
    const index = parseInt(args[1], 10) - 1;

    if (!member || isNaN(index)) {
      return message.reply("❌ Utilisation : `+removewarn @membre [numéro de l'avertissement]`");
    }

    if (!fs.existsSync(logPath)) return message.reply("ℹ️ Aucun avertissement enregistré.");

    const data = JSON.parse(fs.readFileSync(logPath, 'utf8'));
    const logs = data[member.id];

    if (!logs || index < 0 || index >= logs.length) {
      return message.reply("❌ Avertissement introuvable.");
    }

    const removed = logs.splice(index, 1);
    if (logs.length === 0) delete data[member.id];

    fs.writeFileSync(logPath, JSON.stringify(data, null, 2));

    message.channel.send(`✅ Avertissement supprimé : \`${removed[0].reason}\``);
  }
};

