export default {
  name: 'report',
  description: 'Signale un membre au staff.',
  async execute(message, args) {
    const member = message.mentions.members.first();
    const reason = args.slice(1).join(" ");
    const modChannel = message.guild.channels.cache.find(c =>
      c.name.toLowerCase().includes('mod') && c.isTextBased()
    );

    if (!member || !reason) {
      return message.reply("❌ Utilisation : `+report @membre raison`");
    }

    if (!modChannel) {
      return message.reply("❌ Aucun salon de modération trouvé (nom doit contenir `mod`).");
    }

    modChannel.send({
      embeds: [{
        title: "🚨 Signalement",
        color: 0xff0000,
        fields: [
          { name: "Membre signalé", value: `${member} (\`${member.id}\`)` },
          { name: "Signalé par", value: `${message.author} (\`${message.author.id}\`)` },
          { name: "Raison", value: reason }
        ],
        timestamp: new Date()
      }]
    });

    message.reply("✅ Signalement envoyé au staff.");
  }
};
