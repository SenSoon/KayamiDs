export default {
  name: 'snipe',
  description: 'Affiche un message supprimé récent.',
  execute(message, args) {
    const sniped = message.client.snipes?.get(message.channel.id);
    if (!sniped || sniped.length === 0) return message.reply("❌ Aucun message supprimé à afficher.");

    const index = parseInt(args[0], 10) || 1;
    if (isNaN(index) || index < 1 || index > sniped.length) {
      return message.reply(`❌ Donne un index entre 1 et ${sniped.length}.`);
    }

    const snipe = sniped[index - 1];

    return message.channel.send({
      embeds: [{
        title: `📸 Message supprimé #${index}`,
        description: snipe.content,
        footer: { text: `Auteur : ${snipe.author}` },
        timestamp: snipe.time,
        color: 0xff5555
      }]
    });
  }
};
