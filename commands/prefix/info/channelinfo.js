export default {
  name: 'channelinfo',
  description: "Affiche des infos sur le salon actuel ou mentionné",
  async execute(message) {
    const channel = message.mentions.channels.first() || message.channel;

    message.reply(`📚 Infos du salon :\n🔤 Nom : \`${channel.name}\`\n🆔 ID : \`${channel.id}\`\n💬 Type : \`${channel.type}\`\n📝 Sujet : \`${channel.topic || 'Aucun'}\`\n🔐 NSFW : \`${channel.nsfw ? 'Oui' : 'Non'}\``);
  },
};