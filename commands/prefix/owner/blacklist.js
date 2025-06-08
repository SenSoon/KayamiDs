import fs from 'fs';
import { hasAccess } from '../../../utils/hasAccess.js';

const configPath = './data/antiraid-config.json';

function loadConfig() {
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify({ enabled: true, whitelist: [], blacklist: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(configPath));
}

export default {
  name: 'blacklist',
  description: 'Ajoute ou retire un utilisateur de la blacklist anti-raid',
  async execute(message, args) {
    if (!hasAccess(message, 'Administrator')) {
      return message.reply("Tu n'as pas la permission.");
    }

    const action = args[0];
    const user = message.mentions.users.first();
    if (!['add', 'remove'].includes(action) || !user) {
      return message.reply("Utilisation : `+blacklist add @user` ou `+blacklist remove @user`");
    }

    const config = loadConfig();

    if (action === 'add') {
      if (config.blacklist?.includes(user.id)) {
        return message.reply(`${user.tag} est déjà dans la blacklist.`);
      }
      config.blacklist = config.blacklist || [];
      config.blacklist.push(user.id);
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      return message.reply(`🚫 ${user.tag} a été **blacklisté**.`);
    }

    if (action === 'remove') {
      if (!config.blacklist?.includes(user.id)) {
        return message.reply(`${user.tag} n’est pas dans la blacklist.`);
      }
      config.blacklist = config.blacklist.filter(id => id !== user.id);
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      return message.reply(`✅ ${user.tag} a été retiré de la blacklist.`);
    }
  }
};
