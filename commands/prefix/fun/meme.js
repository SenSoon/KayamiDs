export default {
  name: 'meme',
  description: 'Envoie un mème aléatoire.',
  async execute(message) {
    try {
      const res = await fetch('https://meme-api.com/gimme');
      const data = await res.json();

      message.channel.send({
        content: `🤣 **${data.title}**`,
        files: [data.url]
      });
    } catch (err) {
      message.reply('❌ Impossible de récupérer un mème.');
    }
  }
};
