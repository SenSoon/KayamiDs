// commands/fun/hack.js
export default {
  name: "hack",
  description: "Fait semblant de pirater un membre.",
  execute(message) {
    const user = message.mentions.users.first();
    if (!user) return message.reply("Mentionne quelqu’un à hacker !");

    message.channel.send(`🔍 Hack de ${user.username} en cours...`)
      .then(msg => {
        let steps = [
          "🔎 Recherche de l'adresse IP...",
          "📡 Connexion au serveur Discord...",
          "💾 Téléchargement des messages privés...",
          "🔓 Contournement du mot de passe...",
          "📤 Upload des données au dark web...",
          "✅ Hack complété avec succès ! 😈"
        ];
        let i = 0;
        let interval = setInterval(() => {
          if (i < steps.length) {
            msg.edit(steps[i]);
            i++;
          } else {
            clearInterval(interval);
          }
        }, 1500);
      });
  }
};