import fs from 'fs';
import path from 'path';

export default {
  name: 'setprefix',
  description: 'Change le préfixe du bot pour ce serveur',
  async execute(message, args) {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply("⛔ Tu dois être administrateur pour changer le préfix.");
    }

    const newPrefix = args[0];
    if (!newPrefix) return message.reply("❌ Utilisation : `setprefix <nouveau préfixe>`");

    const filePath = path.resolve('data/prefixes.json');
    let prefixes = {};

    if (fs.existsSync(filePath)) {
      prefixes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    prefixes[message.guild.id] = newPrefix;
    fs.writeFileSync(filePath, JSON.stringify(prefixes, null, 2));

    message.reply(`✅ Préfixe mis à jour : \`${newPrefix}\``);
  }
};
