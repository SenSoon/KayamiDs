import { useQueue } from 'discord-player';

export default {
  name: 'skip',
  async execute(message) {
    const queue = useQueue(message.guild.id);
    if (!queue || !queue.node.isPlaying()) return message.reply("❌ Rien à passer.");

    queue.node.skip();
    message.reply("⏭️ Passé à la suivante.");
  }
};
