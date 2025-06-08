export default {
  name: 'servericon',
  description: "Affiche l'icône du serveur",
  async execute(message) {
    const icon = message.guild.iconURL({ dynamic: true, size: 1024 });

    if (!icon) return message.reply("❌ Ce serveur n'a pas d'icône.");

    message.reply({
      content: `🛡️ Icône du serveur **${message.guild.name}** :`,
      files: [icon],
    });
  },
};
