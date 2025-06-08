import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'softban',
  description: 'Ban un membre puis unban pour supprimer ses messages.',
  async execute(message, args) {
    if (!hasAccess(message, 'BanMembers')) {
      return message.reply('❌ Permission `Bannir des membres` requise.');
    }

    const member = message.mentions.members.first();
    const reason = args.slice(1).join(" ") || "Aucune raison fournie.";
    if (!member) return message.reply("❌ Mentionne un membre à softban.");

    try {
      await member.send(`🚫 Tu as été banni temporairement de **${message.guild.name}** pour : ${reason}`);
    } catch {}

    await member.ban({ deleteMessageDays: 1, reason });
    await message.guild.members.unban(member.id);

    message.channel.send(`🔨 ${member.user.tag} a été **softbanni**.`);
  }
};
