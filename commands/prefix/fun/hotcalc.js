export default {
  name: "hotcalc",
  description: "Calcule à quel point quelqu’un est sexy.",
  execute(message) {
    const user = message.mentions.users.first() || message.author;
    const rate = Math.floor(Math.random() * 101);
    message.channel.send(`🔥 ${user.username} est sexy à **${rate}%** !`);
  }
};