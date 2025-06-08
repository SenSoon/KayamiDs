import fs from 'fs';
import { hasAccess } from '../../../utils/hasAccess.js';

const configPath = './data/antiraid-config.json';

function loadConfig() {
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify({ enabled: true, whitelist: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(configPath));
}

export default {
  name: 'whitelist',
  description: 'Gère la whitelist anti-raid',
  async execute(message, args) {
    if (!hasAccess(message, 'Administrator')) {
      return message.reply("Tu n'as pas la permission d’utiliser cette commande.");
    }

    const action = args[0];
    const user = message.mentions.users.first();
    const config = loadConfig();

    if (!['add', 'remove'].includes(action) || !user) {
      return message.reply("Utilisation : `+whitelist add @user` ou `+whitelist remove @user`");
    }

    if (action === 'add') {
      if (config.whitelist.includes(user.id)) {
        return message.reply(`${user.tag} est déjà dans la whitelist.`);
      }
      config.whitelist.push(user.id);
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      return message.reply(`✅ ${user.tag} ajouté à la whitelist.`);
    }

    if (action === 'remove') {
      if (!config.whitelist.includes(user.id)) {
        return message.reply(`${user.tag} n’est pas dans la whitelist.`);
      }
      config.whitelist = config.whitelist.filter(id => id !== user.id);
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      return message.reply(`❌ ${user.tag} retiré de la whitelist.`);
    }
  }
};
