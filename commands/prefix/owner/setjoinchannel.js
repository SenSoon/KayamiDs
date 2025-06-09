import fs from 'fs';
import path from 'path';

export default {
  name: 'setjoinchannel',
  description: 'Définit le salon vocal de base pour le Join to Create',
  ownerOnly: true,
  async execute(message, args) {
    const channel = message.member.voice.channel;
    if (!channel) return message.reply('❌ Tu dois être dans un salon vocal.');

    const filePath = path.resolve('data/joinToCreate.json');
    const data = {
      guildId: message.guild.id,
      channelId: channel.id
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    message.reply(`✅ Salon de base défini sur : **${channel.name}**`);
  }
};
