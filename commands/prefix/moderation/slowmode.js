import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'slowmode',
  description: 'Active un mode lent (slowmode) dans le salon.',
  async execute(message, args) {
    if (!hasAccess(message, 'ManageChannels')) {
      return message.reply("❌ Tu n’as pas la permission `Gérer les salons`.");
    }

    const seconds = parseInt(args[0], 10);
    if (isNaN(seconds) || seconds < 0 || seconds > 21600) {
      return message.reply("❌ Indique un délai entre 0 et 21600 secondes.");
    }

    await message.channel.setRateLimitPerUser(seconds);
    message.channel.send(`🐢 Mode lent défini sur **${seconds} secondes**.`);
  }
};
