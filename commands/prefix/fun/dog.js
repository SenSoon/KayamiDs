export default {
  name: 'dog',
  description: 'Envoie une image de chien random.',
  async execute(message) {
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();

      message.channel.send({ content: '🐶 Woof !', files: [data.message] });
    } catch (err) {
      message.reply('❌ Impossible de récupérer une image.');
    }
  }
};
