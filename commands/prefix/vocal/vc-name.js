export default {
  name: 'vc-name',
  description: 'Change le nom de ton salon vocal temporaire.',
  async execute(message, args) {
    const newName = args.join(' ');

    if (!newName) {
      return message.reply("❌ Donne un nom, ex : `!vc-name Salle privée`");
    }

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply("❌ Tu dois être connecté à un salon vocal.");
    }

    // Vérifie que l'utilisateur est bien le créateur du salon temporaire
    const guild = message.guild;
    if (!guild.tempVoiceChannels || guild.tempVoiceChannels.get(voiceChannel.id) !== message.author.id) {
      return message.reply("❌ Tu ne peux renommer que ton salon temporaire.");
    }

    try {
      await voiceChannel.setName(`🔊 ${newName}`);
      message.reply(`✅ Ton salon a été renommé en \`${newName}\``);
    } catch (err) {
      console.error(err);
      message.reply("❌ Une erreur est survenue.");
    }
  }
};
