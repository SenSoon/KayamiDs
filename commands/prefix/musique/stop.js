import { useQueue } from 'discord-player';

export default {
  name: 'stop',
  async execute(message) {
    const queue = useQueue(message.guild.id);
    if (!queue) return message.reply("❌ Aucun player trouvé.");

    queue.delete();
    message.reply("⏹️ Musique arrêtée.");
  }
};
