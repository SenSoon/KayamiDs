import fs from 'fs';
import path from 'path';

export default {
  name: 'vc-setup',
  description: 'Configure le salon vocal "Join to Create".',
  async execute(message, args) {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply("❌ Tu dois être administrateur.");
    }

    const name = args.join(' ') || '🔊 Join to Create';

    const channel = await message.guild.channels.create({
      name,
      type: 2,
      permissionOverwrites: [
        {
          id: message.guild.id,
          allow: ['Connect', 'ViewChannel']
        }
      ]
    });

    const filePath = path.resolve('data/joinToCreate.json');
    fs.writeFileSync(filePath, JSON.stringify({ channelId: channel.id }, null, 2));

    message.reply(`✅ Salon configuré : ${channel}`);
  }
};
