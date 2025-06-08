export default {
  name: 'shutdown',
  description: 'Arrête le bot (owner only)',
  ownerOnly: true,
  execute(message) {
    message.reply("⏹️ Extinction en cours...").then(() => {
      process.exit(0);
    });
  }
};
