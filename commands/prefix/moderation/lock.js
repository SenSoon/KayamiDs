import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'lock',
  description: 'Verrouille le salon actuel (empêche les membres d’envoyer des messages).',
  async execute(message) {
    if (!hasAccess(message, 'ManageChannels')) {
      return message.reply("❌ Tu n’as pas la permission `Gérer les salons`.");
    }

    const channel = message.channel;

    try {
      await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SendMessages: false
      });

      message.channel.send("🔒 Ce salon est maintenant **verrouillé**.");
    } catch (error) {
      console.error(error);
      message.reply("❌ Impossible de verrouiller ce salon.");
    }
  }
};
