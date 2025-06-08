import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'unlock',
  description: 'Déverrouille le salon actuel (autorise les messages).',
  async execute(message) {
    if (!hasAccess(message, 'ManageChannels')) {
      return message.reply("❌ Tu n’as pas la permission `Gérer les salons`.");
    }

    const channel = message.channel;

    try {
      await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SendMessages: null // remet par défaut
      });

      message.channel.send("🔓 Ce salon est maintenant **déverrouillé**.");
    } catch (error) {
      console.error(error);
      message.reply("❌ Impossible de déverrouiller ce salon.");
    }
  }
};
