import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'kick',
  description: 'Expulse un membre du serveur (avec MP avant).',
  ownerOnly: false,

  async execute(message, args) {
    if (!hasAccess(message, 'KickMembers')) {
      return message.reply("❌ Tu n'as pas la permission `Expulser des membres`.");
    }

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';

    if (!member) return message.reply("❌ Utilisation : `+kick @membre [raison]`");

    if (!member.kickable) {
      return message.reply("❌ Je ne peux pas expulser ce membre (rôle trop haut ?)");
    }

    if (member.id === message.author.id) {
      return message.reply("❌ Tu ne peux pas t’expulser toi-même.");
    }

    try {
      await member.send({
        content: `⚠️ Tu as été **expulsé** du serveur **${message.guild.name}**.\n📄 Raison : \`${reason}\``
      }).catch(() => {
        message.channel.send("⚠️ Impossible d’envoyer un MP à l’utilisateur.");
      });

      await member.kick(reason);
      message.channel.send(`✅ **${member.user.tag}** a été expulsé. Raison : \`${reason}\``);
    } catch (err) {
      console.error(err);
      message.reply("❌ Une erreur est survenue lors de l'expulsion.");
    }
  }
};
