import { EmbedBuilder } from 'discord.js';

export default {
  name: 'embed',
  description: 'Envoie un message embed.',
  async execute(message, args) {
    const content = args.join(' ');
    if (!content) return message.reply('❌ Utilisation : `embed <texte>`');

    const embed = new EmbedBuilder()
      .setColor('#00BFFF')
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
      .setDescription(content)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};