export default {
  name: 'note',
  description: 'Note quelque chose sur 10.',
  async execute(message, args) {
    const subject = args.join(' ');
    if (!subject) return message.reply('❌ Utilisation : `rate <quelque chose>`');

    const rating = (Math.random() * 10).toFixed(1);
    message.reply(`📊 Je donne à **${subject}** une note de **${rating}/10** !`);
  }
};
