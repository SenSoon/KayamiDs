import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'unban',
  description: 'Débannit un utilisateur du serveur.',
  ownerOnly: false,

  async execute(message, args) {
    if (!hasAccess(message, 'BanMembers')) {
      return message.reply("❌ Tu n'as pas la permission `Bannir des membres`.");
    }

    const userId = args[0];
    const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';

    if (!userId || isNaN(userId)) {
      return message.reply("❌ Utilisation : `+unban ID_utilisateur [raison]`");
    }

    try {
      const bans = await message.guild.bans.fetch();
      const bannedUser = bans.get(userId);

      if (!bannedUser) {
        return message.reply("❌ Cet utilisateur n’est pas banni.");
      }

      await message.guild.members.unban(userId, reason);
      message.channel.send(`✅ L'utilisateur **${bannedUser.user.tag}** a été débanni. 🔓 Raison : \`${reason}\``);
    } catch (err) {
      console.error(err);
      message.reply("❌ Une erreur est survenue lors du débannissement.");
    }
  }
};
