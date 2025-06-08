import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'clear',
  description: 'Supprime un certain nombre de messages.',
  async execute(message, args) {
    if (!hasAccess(message, 'ManageMessages')) {
      return message.reply("❌ Tu n’as pas la permission `Gérer les messages`.");
    }

    const amount = parseInt(args[0], 10);
    if (isNaN(amount) || amount < 1 || amount > 100) {
      return message.reply("❌ Spécifie un nombre entre 1 et 100.");
    }

    await message.delete();
    const deleted = await message.channel.bulkDelete(amount, true);
    message.channel.send(`🧹 ${deleted.size} messages supprimés.`).then(m => setTimeout(() => m.delete(), 3000));
  }
};
