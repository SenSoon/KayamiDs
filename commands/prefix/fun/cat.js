import fetch from 'node-fetch';

export default {
  name: 'cat',
  description: 'Affiche une image de chat aléatoire.',
  async execute(message) {
    try {
      const res = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await res.json();

      if (!data[0]?.url) {
        return message.reply("❌ Impossible de récupérer une image de chat.");
      }

      const embed = {
        color: 0xffcc00,
        title: '🐱 Miaou !',
        image: { url: data[0].url },
        footer: { text: 'Voici ton chat aléatoire.' }
      };

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.reply("❌ Une erreur est survenue en récupérant l'image.");
    }
  }
};
