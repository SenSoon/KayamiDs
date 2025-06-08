import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'rolecreate',
  description: 'Créer un rôle avec un nom et une couleur optionnelle',
  async execute(message, args) {
    if (!hasAccess(message, 'ManageRoles')) {
      return message.reply("❌ Tu n'as pas la permission de créer des rôles.");
    }

    const nom = args[0];
    const couleur = args[1]; // optionnel

    if (!nom) {
      return message.reply('❗ Tu dois spécifier un nom de rôle.');
    }

    try {
      const role = await message.guild.roles.create({
        name: nom,
        color: couleur || undefined,
        reason: `Créé par ${message.author.tag}`
      });

      message.reply(`✅ Rôle **${role.name}** créé avec succès${couleur ? ` (couleur ${couleur})` : ''}.`);
    } catch (err) {
      console.error(err);
      message.reply('❌ Erreur lors de la création du rôle. Vérifie la couleur ou les permissions.');
    }
  }
};
