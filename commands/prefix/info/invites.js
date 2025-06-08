export default {
  name: "invites",
  description: "Affiche le nombre d'invitations créées et utilisées par un membre.",
  async execute(message, args) {
    const member = message.mentions.members.first() || message.member;

    try {
      const invites = await message.guild.invites.fetch();
      const userInvites = invites.filter(inv => inv.inviter?.id === member.id);

      let totalUses = 0;
      let totalInvites = 0;

      userInvites.forEach(inv => {
        totalInvites++;
        totalUses += inv.uses || 0;
      });

      message.reply({
        embeds: [
          {
            title: `📨 Invitations de ${member.user.tag}`,
            color: 0x1abc9c,
            fields: [
              { name: "🔗 Invitations créées", value: `${totalInvites}`, inline: true },
              { name: "👥 Utilisations totales", value: `${totalUses}`, inline: true }
            ],
            footer: { text: `ID: ${member.id}` },
            timestamp: new Date()
          }
        ]
      });
    } catch (error) {
      console.error("Erreur en récupérant les invitations :", error);
      message.reply("❌ Une erreur est survenue lors de la récupération des invitations.");
    }
  }
};
