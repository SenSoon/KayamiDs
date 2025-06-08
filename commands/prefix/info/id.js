export default {
  name: 'id',
  description: "Affiche les ID d'un utilisateur, salon ou serveur",
  async execute(message) {
    const target = message.mentions.users.first() || message.author;
    const channel = message.channel;
    const guild = message.guild;

    message.reply(`🆔 **IDs** :\n👤 Utilisateur : \`${target.id}\`\n💬 Salon : \`${channel.id}\`\n🌐 Serveur : \`${guild.id}\``);
  },
};