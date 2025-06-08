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
  name: 'antiraid',
  description: 'Active ou désactive l’anti-raid',
  async execute(message, args) {
    if (!hasAccess(message, 'Administrator')) {
      return message.reply("Tu n'as pas la permission d’utiliser cette commande.");
    }

    const config = loadConfig();
    const sub = args[0];

    if (sub === 'on') {
      config.enabled = true;
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      return message.reply("🟢 Anti-raid **activé**.");
    }

    if (sub === 'off') {
      config.enabled = false;
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      return message.reply("🔴 Anti-raid **désactivé**.");
    }

    return message.reply("Utilisation : `+antiraid on` ou `+antiraid off`");
  }
};

