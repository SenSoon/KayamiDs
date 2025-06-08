export default {
  name: "botinvite",
  description: "Affiche le lien d'invitation du bot.",
  execute(message) {
    const inviteURL = `https://discord.com/oauth2/authorize?client_id=1377581727207264267&permissions=8&integration_type=0&scope=bot+applications.commands`;

    message.reply(`🤖 Invite-moi sur ton serveur !\n🔗 ${inviteURL}`);
  }
};
