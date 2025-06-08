import { getWarnings } from '../../../utils/warnManager.js';

export default {
  name: 'history',
  description: "Affiche l'historique des sanctions d'un membre.",
  async execute(message, args) {
    const user = message.mentions.users.first();
    if (!user) return message.reply("❌ Mentionne un membre.");

    const logs = getWarnings(user.id);
    if (!logs.length) return message.reply(`ℹ️ Aucun historique trouvé pour ${user.tag}.`);

    const embed = {
      title: `📄 Historique de ${user.tag}`,
      color: 0xffaa00,
      fields: logs.map((entry, i) => ({
        name: `#${i + 1} – ${entry.type.toUpperCase()}`,
        value: `👮‍♂️ Par : <@${entry.by}>\n📄 Raison : ${entry.reason}\n🕒 ${entry.date}`,
        inline: false
      })),
      timestamp: new Date()
    };

    message.channel.send({ embeds: [embed] });
  }
};
