export default {
  name: 'muted',
  description: 'Affiche les membres actuellement mute (timeout).',
  async execute(message) {
    const members = await message.guild.members.fetch();
    const muted = members.filter(m => m.isCommunicationDisabled());

    if (!muted.size) {
      return message.reply("✅ Aucun membre n’est actuellement mute.");
    }

    const list = muted.map(m => `- ${m.user.tag} (jusqu’au <t:${Math.floor(m.communicationDisabledUntilTimestamp / 1000)}:R>)`).join('\n');

    message.channel.send(`🔇 Membres actuellement mute :\n${list}`);
  }
};
