export default {
  name: 'say',
  description: 'Fais parler le bot dans un salon spécifié ou ici 📢',
  ownerOnly: false,

  async execute(message, args) {
    // Supprime le message de l'auteur
    if (message.deletable) await message.delete();

    // Vérifie si un salon est mentionné
    const channelMention = message.mentions.channels.first();
    const channel = channelMention || message.channel;

    // Retire l’ID du salon mentionné des arguments
    const cleanArgs = channelMention
      ? args.slice(1) // skip #channel
      : args;

    const text = cleanArgs.join(' ');

    if (!text) {
      return message.channel.send('📝 Tu dois entrer un message à faire dire au bot.');
    }

    try {
      await channel.send(text);
    } catch (err) {
      console.error(err);
      message.channel.send('❌ Impossible d\'envoyer le message dans ce salon.');
    }
  }
};
