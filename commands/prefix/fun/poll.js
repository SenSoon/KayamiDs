export default {
  name: 'poll',
  description: 'Crée un sondage avec des réactions.',
  async execute(message, args) {
    const question = args.join(' ');
    if (!question) return message.reply('❌ Utilisation : `poll <question>`');

    const embed = {
      color: 0x00b0f4,
      title: '📊 Sondage',
      description: question,
      footer: {
        text: `Demandé par ${message.author.username}`,
        icon_url: message.author.displayAvatarURL()
      },
      timestamp: new Date()
    };

    const pollMessage = await message.channel.send({ embeds: [embed] });

    await pollMessage.react('✅');
    await pollMessage.react('❌');
  }
};
