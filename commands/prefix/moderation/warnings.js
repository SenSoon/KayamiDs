import { getWarnings } from '../../../utils/warnManager.js';

export default {
  name: 'warnings',
  description: 'Affiche les avertissements d’un membre.',
  async execute(message, args) {
    const member = message.mentions.members.first();
    if (!member) return message.reply("❌ Utilisation : `+warnings @membre`");

    const warns = getWarnings(message.guild.id, member.id);
    if (!warns.length) return message.reply(`✅ **${member.user.tag}** n’a aucun avertissement.`);

    const formatted = warns.map((w, i) =>
      `\`#${i + 1}\` ● **Modérateur :** <@${w.moderator}> • **Raison :** ${w.reason} • *${new Date(w.date).toLocaleString()}*`
    ).join('\n');

    message.channel.send(`📄 Avertissements de **${member.user.tag}** :\n${formatted}`);
  }
};
