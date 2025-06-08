import { hasAccess } from '../../../utils/hasAccess.js';

export default {
  name: 'shadowmute',
  description: 'Isole un membre dans un salon invisible.',
  async execute(message, args) {
    if (!hasAccess(message, 'ManageChannels')) {
      return message.reply('❌ Permission `Gérer les salons` requise.');
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply("❌ Mentionne un membre à isoler.");

    let prison = message.guild.channels.cache.find(c => c.name === 'shadow-prison');
    if (!prison) {
      prison = await message.guild.channels.create({
        name: 'shadow-prison',
        type: 0, // salon textuel
        permissionOverwrites: [
          { id: message.guild.id, deny: ['ViewChannel'] },
          { id: member.id, allow: ['ViewChannel', 'SendMessages'] }
        ]
      });
    } else {
      await prison.permissionOverwrites.edit(member.id, {
        ViewChannel: true,
        SendMessages: true
      });
    }

    await message.reply(`🕳️ ${member} est désormais isolé dans ${prison}.`);
    member.send(`⚠️ Tu as été isolé dans un salon privé sur **${message.guild.name}**.`).catch(() => {});
  }
};
