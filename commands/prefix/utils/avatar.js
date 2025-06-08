export default {
  name: 'avatar',
  description: "Affiche l'avatar d'un utilisateur",
  async execute(message, args) {
    const member = message.mentions.members.first() || message.member;
    const avatarURL = member.displayAvatarURL({ dynamic: true, size: 1024 });

    message.reply({
      content: `🖼️ Avatar de **${member.user.tag}** :`,
      files: [avatarURL],
    });
  },
};
