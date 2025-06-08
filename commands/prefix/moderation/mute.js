import { hasAccess } from '../../../utils/hasAccess.js';
import ms from 'ms';

export default {
  name: 'mute',
  description: 'Rend un membre muet (timeout Discord).',
  ownerOnly: false,

  async execute(message, args) {
    if (!hasAccess(message, 'ModerateMembers')) {
      return message.reply("❌ Tu n’as pas la permission `Modérer les membres`.");
    }

    const member = message.mentions.members.first();
    const timeArg = args[1];
    const reason = args.slice(2).join(' ') || 'Aucune raison spécifiée';

    if (!member || !timeArg) {
      return message.reply("❌ Utilisation : `+mute @membre durée [raison]`\nExemples : `+mute @user 10m spam`");
    }

    if (member.id === message.author.id) {
      return message.reply("❌ Tu ne peux pas te mute toi-même.");
    }

    if (!member.moderatable) {
      return message.reply("❌ Je ne peux pas mute ce membre (rôle trop élevé ?)");
    }

    const durationMs = ms(timeArg);
    if (!durationMs || durationMs < 1000 || durationMs > 2419200000) { // max 28j
      return message.reply("❌ Durée invalide. Exemples valides : `10m`, `2h`, `1d`.");
    }

    try {
      await member.send(`🔇 Tu as été **mute** dans **${message.guild.name}** pour **${timeArg}**.\n📄 Raison : \`${reason}\``)
        .catch(() => message.channel.send("⚠️ Impossible de DM ce membre."));

      await member.timeout(durationMs, reason);
      message.channel.send(`✅ **${member.user.tag}** a été mute pour \`${timeArg}\`. Raison : \`${reason}\``);
    } catch (err) {
      console.error(err);
      message.reply("❌ Une erreur est survenue lors du mute.");
    }
  }
};
