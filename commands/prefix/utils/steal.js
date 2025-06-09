import { AttachmentBuilder } from 'discord.js';

export default {
  name: 'steal',
  description: "Ajoute un emoji d'un autre serveur",
  async execute(message, args) {
    const emoji = args[0];
    if (!emoji) return message.reply('❌ Donne un emoji à voler.');

    const match = emoji.match(/<a?:\w+:(\d+)>/);
    if (!match) return message.reply('❌ Emoji invalide.');

    const id = match[1];
    const isAnimated = emoji.startsWith('<a:');
    const ext = isAnimated ? 'gif' : 'png';
    const url = `https://cdn.discordapp.com/emojis/${id}.${ext}?quality=lossless`;

    const attachment = new AttachmentBuilder(url, { name: `emoji.${ext}` });
    message.reply({ content: `Voici l'emoji volé :`, files: [attachment] });
  }
};
