export default {
  name: 'pp',
  description: 'Affiche la taille du pénis d’un membre.',
  async execute(message, args) {
    const member = message.mentions.members.first() || message.member;
    const username = member.displayName;

    const length = Math.floor(Math.random() * 25) + 1; // de 1 à 15
    const penis = `8${'='.repeat(length)}D`;

    const embed = {
      color: 0xff66cc,
      title: '🍆 Mesure de PP',
      description: `**${username}** a une PP de :\n\`${penis}\``,
      footer: {
        text: 'Ceci est purement scientifique.',
      },
    };

    message.channel.send({ embeds: [embed] });
  }
};