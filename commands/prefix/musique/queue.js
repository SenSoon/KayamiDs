import { useQueue } from 'discord-player';

export default {
  name: 'queue',
  async execute(message) {
    const queue = useQueue(message.guild.id);
    if (!queue || !queue.tracks.length) return message.reply("📭 Aucune file d'attente.");

    const list = queue.tracks.map((t, i) => `${i + 1}. ${t.title}`).join('\n');
    message.reply(`🎶 **Queue :**\n${list}`);
  }
};

