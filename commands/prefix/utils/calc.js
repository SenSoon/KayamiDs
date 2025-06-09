import { evaluate } from 'mathjs';

export default {
  name: 'calc',
  description: 'Calcule une expression mathématique.',
  async execute(message, args) {
    const expression = args.join(' ');
    if (!expression) return message.reply('❌ Utilisation : `calc <expression>`');

    try {
      const result = evaluate(expression);
      message.reply(`🧮 Résultat : \`${result}\``);
    } catch (err) {
      message.reply('❌ Expression invalide.');
    }
  }
};
