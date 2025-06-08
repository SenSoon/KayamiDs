import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'nick',
  description: 'Change le pseudo d’un membre.',
  async execute(message, args) {
    if (!hasAccess(message, 'ManageNicknames')) {
      return message.reply("❌ Tu n’as pas la permission `Gérer les pseudos`.");
    }

    const member = message.mentions.members.first();
    const newNick = args.slice(1).join(" ");
    if (!member || !newNick) {
      return message.reply("❌ Utilisation : `+nick @membre NouveauPseudo`");
    }

    await member.setNickname(newNick).catch(() => {
      return message.reply("❌ Je ne peux pas changer le pseudo de ce membre.");
    });

    message.channel.send(`✏️ Pseudo de ${member} changé en **${newNick}**.`);
  }
};
