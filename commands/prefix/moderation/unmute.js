import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'unmute',
  description: 'Retire le mute (timeout) d’un membre.',
  async execute(message, args) {
    if (!hasAccess(message, 'ModerateMembers')) {
      return message.reply("❌ Tu n’as pas la permission `Modérer les membres`.");
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply("❌ Utilisation : `+unmute @membre`");

    if (!member.isCommunicationDisabled()) {
      return message.reply("ℹ️ Ce membre n’est pas actuellement mute.");
    }

    try {
      await member.timeout(null, `Unmute par ${message.author.tag}`);
      await member.send(`🔊 Tu as été **unmute** dans **${message.guild.name}**.`)
        .catch(() => message.channel.send("⚠️ Impossible de DM ce membre."));

      message.channel.send(`✅ **${member.user.tag}** a été unmute.`);
    } catch (err) {
      console.error(err);
      message.reply("❌ Une erreur est survenue lors du unmute.");
    }
  }
};
