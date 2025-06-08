import 'dotenv/config';

export default {
  name: 'delrole',
  description: 'Supprime un rôle d’un membre.',
  ownerOnly: false,

  async execute(message, args) {
    const isOwner = message.author.id === process.env.OWNER_ID;

    // Si pas owner et pas de permission
    if (!isOwner && !message.member.permissions.has('ManageRoles')) {
      return message.reply("❌ Tu dois avoir la permission `Gérer les rôles` pour utiliser cette commande.");
    }

    if (!message.guild.members.me.permissions.has('ManageRoles')) {
      return message.reply("❌ Je n'ai pas la permission `Gérer les rôles`.");
    }

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

    if (!member || !role) {
      return message.reply("❌ Utilisation : `+delrole @membre @rôle` ou `+delrole ID_Membre ID_Role`");
    }

    if (!member.roles.cache.has(role.id)) {
      return message.reply("ℹ️ Ce membre n’a pas ce rôle.");
    }

    // Vérifie la hiérarchie
    const botHighest = message.guild.members.me.roles.highest.position;
    if (role.position >= botHighest) {
      return message.reply("❌ Je ne peux pas retirer un rôle supérieur ou égal à mon plus haut rôle.");
    }

    try {
      await member.roles.remove(role);
      message.channel.send(`✅ Rôle **${role.name}** retiré de **${member.user.tag}**.`);
    } catch (err) {
      console.error(err);
      message.reply("❌ Une erreur est survenue lors du retrait du rôle.");
    }
  }
};
