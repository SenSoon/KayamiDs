export default {
  name: '8ball',
  description: 'Pose une question à la boule magique.',
  async execute(message, args) {
    const question = args.join(' ');
    if (!question.endsWith('?')) return message.reply('❌ Pose une vraie question.');

    const responses = [
      "Oui.", "Non.", "Peut-être.", "Absolument !", "Jamais.", "Demande plus tard.", "Certainement.", "Je ne pense pas."
    ];

    const answer = responses[Math.floor(Math.random() * responses.length)];
    message.reply(`🎱 **Question :** ${question}\n**Réponse :** ${answer}`);
  }
};
