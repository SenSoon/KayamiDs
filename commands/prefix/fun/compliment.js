export default {
  name: "compliment",
  description: "Fait un compliment à un membre.",
  execute(message) {
    const user = message.mentions.users.first() || message.author;

    const compliments = [
      "t’as un cœur en or 💛",
      "ton style est impeccable 👌",
      "tu rends ce serveur plus cool 😎",
      "tu as une vibe incroyable ✨",
      "tu pourrais illuminer un salon éteint 🔆",
      "tu es tellement incroyable que je pourrais te donner ma bite 😏",
      "tu as un boule tellement enorme que même sophie rain est jalouse 🍑"
    ];

    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    message.channel.send(`💖 ${user.username}, ${compliment}`);
  }
};