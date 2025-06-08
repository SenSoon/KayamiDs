import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'ban',
  description: 'Bannit un membre du serveur (avec MP avant).',
  ownerOnly: false,

  async execute(message, args) {
    if (!hasAccess(message, 'BanMembers')) {
      return message.reply("❌ Tu n'as pas la permission `Bannir des membres`.");
    }

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';

    if (!member) return message.reply("❌ Utilisation : `+ban @membre [raison]`");

    if (!member.bannable) {
      return message.reply("❌ Je ne peux pas bannir ce membre (rôle trop haut ?)");
    }

    if (member.id === message.author.id) {
      return message.reply("❌ Tu ne peux pas te bannir toi-même.");
    }

    try {
      // Essaye d'envoyer un MP à l'utilisateur
      await member.send({
        content: `🚫 Tu as été **banni** du serveur **${message.guild.name}**.\n📄 Raison : \`${reason}\``
      }).catch(() => {
        message.channel.send("⚠️ Impossible de DM l'utilisateur (MP fermés).");
      });

      await member.ban({ reason });
      message.channel.send(`✅ **${member.user.tag}** a été banni. Raison : \`${reason}\``);
    } catch (err) {
      console.error(err);
      message.reply("❌ Une erreur est survenue lors du bannissement.");
    }
  }
};
