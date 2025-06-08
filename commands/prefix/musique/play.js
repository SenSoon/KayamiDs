import { useMainPlayer } from 'discord-player';

export default {
  name: 'play',
  async execute(message, args) {
    const query = args.join(" ");
    if (!query) return message.reply("❌ Donne une musique à jouer.");

    const player = useMainPlayer();
    const res = await player.play(message.member.voice.channel, query, {
      nodeOptions: {
        metadata: message
      }
    });

    message.reply(`▶️ Lecture : **${res.track.title}**`);
  }
};
