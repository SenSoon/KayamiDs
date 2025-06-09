export default {
  name: "insult",
  description: "Insulte un membre de manière drôle.",
  execute(message) {
    const user = message.mentions.users.first();
    if (!user) return message.reply("Mentionne quelqu’un à insulter !");
    if (user.id === message.author.id) return message.reply("Pourquoi t’insulter toi-même ? 😢");

    const insults = [
      "t'es plus lent qu'une mise à jour Windows.",
      "même Clippy est plus utile que toi.",
      "t’as le QI d’un bot AFK.",
      "tu bugues plus qu’un serveur de test.",
      "t’as été rejeté par ChatGPT...",
      "t'es tellement moche que même ton père t'a abandonné.",
      "Si j'avais un euro pour chaque fois que tu as oublié de fermer ta gueule, je serais millionaire."
      ];

    const insult = insults[Math.floor(Math.random() * insults.length)];
    message.channel.send(`💥 ${user.username}, ${insult}`);
  }
};