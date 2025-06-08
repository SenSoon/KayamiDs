import { useQueue } from 'discord-player';

export default {
  name: 'restart',
  async execute(message) {
    const queue = useQueue(message.guild.id);
    if (!queue || !queue.currentTrack) return message.reply("❌ Rien à recommencer.");

    queue.node.seek(0);
    message.reply("🔁 Musique relancée depuis le début.");
  }
};
