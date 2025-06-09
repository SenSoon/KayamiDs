export default {
  name: 'vc-reset',
  description: 'Supprime tous les salons vocaux temporaires créés automatiquement.',
  async execute(message) {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply("❌ Tu dois être administrateur.");
    }

    const guild = message.guild;
    let count = 0;

    // Si la map temporaire n'existe pas (ex: après reboot), on scan tous les salons vocaux
    for (const [id, channel] of guild.channels.cache) {
      if (channel.type === 2 && channel.name.startsWith('🔊 ')) {
        await channel.delete().catch(() => {});
        count++;
      }
    }

    message.reply(`🧹 ${count} salons vocaux supprimés.`);
  }
};
