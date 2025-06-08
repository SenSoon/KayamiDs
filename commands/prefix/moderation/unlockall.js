import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'unlockall',
  description: 'Déverrouille tous les salons texte du serveur après confirmation.',
  async execute(message) {
    if (!hasAccess(message, 'ManageChannels')) {
      return message.reply("❌ Tu n’as pas la permission `Gérer les salons`.");
    }

    const confirmMsg = await message.channel.send("⚠️ Veux-tu vraiment **déverrouiller tous les salons** ? Réagis avec ✅ pour confirmer ou ❌ pour annuler.");

    try {
      await confirmMsg.react('✅');
      await confirmMsg.react('❌');
    } catch (error) {
      console.error("Erreur lors de l'ajout des réactions :", error);
      return message.reply("❌ Impossible d’ajouter les réactions de confirmation.");
    }

    const filter = (reaction, user) =>
      ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;

    confirmMsg.awaitReactions({ filter, max: 1, time: 15000, errors: ['time'] })
      .then(async collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '✅') {
          const channels = message.guild.channels.cache.filter(c => c.isTextBased());
          let unlocked = 0;

          for (const channel of channels.values()) {
            try {
              await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SendMessages: null // remet par défaut
              });
              unlocked++;
            } catch (err) {
              console.error(`Erreur sur ${channel.name}:`, err.message);
            }
          }

          confirmMsg.edit(`🔓 Déverrouillage terminé : **${unlocked} salons** déverrouillés.`);
        } else {
          confirmMsg.edit("❌ Déverrouillage annulé.");
        }
      })
      .catch(() => {
        confirmMsg.edit("⏰ Temps écoulé. Déverrouillage annulé.");
      });
  }
};

