export default {
  name: 'uptime',
  description: "Affiche depuis combien de temps le bot est en ligne",
  async execute(message) {
    const totalSeconds = Math.floor(process.uptime());
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    message.reply(`⏱️ Uptime : \`${days}j ${hours}h ${minutes}m ${seconds}s\``);
  },
};