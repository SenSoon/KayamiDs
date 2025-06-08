import { hasAccess } from '../../../utils/hasAccess.js';
import { addWarning } from '../../../utils/warnManager.js';

export default {
  name: 'warn',
  description: 'Avertit un membre (et enregistre).',
  async execute(message, args) {
    if (!hasAccess(message, 'ManageMessages')) {
      return message.reply("❌ Permission requise : `Gérer les messages`.");
    }

    const member = message.mentions.members.first();
    const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';

    if (!member) return message.reply("❌ Utilisation : `+warn @membre [raison]`");

    if (member.id === message.author.id) return message.reply("❌ Tu ne peux pas t’avertir toi-même.");

    try {
      await member.send(`⚠️ Tu as reçu un **avertissement** dans **${message.guild.name}**.\n📄 Raison : \`${reason}\``)
        .catch(() => message.channel.send("⚠️ Impossible de DM ce membre."));

      addWarning(message.guild.id, member.id, message.author.id, reason);
      message.channel.send(`✅ **${member.user.tag}** a été averti. Raison : \`${reason}\``);
    } catch (e) {
      console.error(e);
      message.reply("❌ Une erreur est survenue.");
    }
  }
};
