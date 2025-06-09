// commands/fun/slap.js
export default {
  name: "slap",
  description: "Gifle un membre (virtuellement).",
  execute(message) {
    const user = message.mentions.users.first();
    if (!user || user.id === message.author.id) {
      return message.reply("Tu ne peux pas te gifler toi-même !");
    }

    const gifs = [
      "https://media.giphy.com/media/Gf3AUz3eBNbTW/giphy.gif",
      "https://media.giphy.com/media/jLeyZWgtwgr2U/giphy.gif",
      "https://media.giphy.com/media/RXGNsyRb1hDJm/giphy.gif"
    ];
    const slapGif = gifs[Math.floor(Math.random() * gifs.length)];

    message.channel.send({
      content: `👋 ${message.author.username} gifle ${user.username} !`,
      files: [slapGif]
    });
  }
};