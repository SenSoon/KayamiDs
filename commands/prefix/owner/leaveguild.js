export default {
  name: 'leaveguild',
  description: 'Fait quitter un serveur au bot (owner only)',
  ownerOnly: true,
  async execute(message, args) {
    const guild = message.client.guilds.cache.get(args[0]);
    if (!guild) return message.reply("❌ Serveur introuvable.");
    await guild.leave();
    message.reply(`🚪 A quitté le serveur : ${guild.name}`);
  }
};
