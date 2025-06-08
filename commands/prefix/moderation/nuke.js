import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'nuke',
  description: 'Supprime et recrée le salon actuel.',
  async execute(message) {
    if (!hasAccess(message, 'ManageChannels')) {
      return message.reply("❌ Tu n’as pas la permission `Gérer les salons`.");
    }

    const channel = message.channel;
    const position = channel.position;

    const newChannel = await channel.clone();
    await channel.delete();
    await newChannel.setPosition(position);
    newChannel.send('💣 Salon recréé avec succès.');
  }
};
