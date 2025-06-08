import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'addsalon',
  description: 'Créer un salon texte ou vocal',
  async execute(message, args) {
    if (!hasAccess(message, 'ManageChannels')) {
      return message.reply("❌ Tu n'as pas la permission de créer un salon.");
    }

    const type = args[0];
    const nom = args[1];

    if (!type || !['text', 'voc'].includes(type))
      return message.reply('❗ Spécifie le type de salon (`text` ou `vocal`) en premier argument.');
    if (!nom)
      return message.reply('❗ Tu dois spécifier un nom de salon.');

    const salonType = type === 'text' ? 0 : 2; // 0 = GUILD_TEXT, 2 = GUILD_VOICE

    try {
      await message.guild.channels.create({
        name: nom,
        type: salonType,
      });

      message.reply(`✅ Salon **${type === 'text' ? '#' : ''}${nom}** (${type}) créé avec succès.`);
    } catch (err) {
      console.error(err);
      message.reply('❌ Une erreur est survenue lors de la création du salon.');
    }
  }
};
