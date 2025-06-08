import fs from 'fs';
import path from 'path';

export default {
  name: 'lovecalc',
  description: 'Calcule l\'amour entre toi et quelqu\'un 💘',
  ownerOnly: false,

  async execute(message) {
    const target = message.mentions.users.first();
    if (!target) {
      return message.reply("💔 Tu dois mentionner quelqu'un !");
    }

    const sender = message.author;
    const specialSenderId = '1176228920106946830'; // Toi
    const specialTargetId = '1359905566255747293'; // Personne spéciale

    const filePath = path.resolve('./data/lovecalc.json');
    let data = {};

    // Lire le fichier
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath);
        data = JSON.parse(raw);
      }
    } catch (err) {
      console.error('❌ Erreur lecture lovecalc.json :', err);
    }

    const key = `${sender.id}_${target.id}`;

    let pourcentage;

    // Cas spécial : Toi + ton crush = 100%
    if (sender.id === specialSenderId && target.id === specialTargetId) {
      pourcentage = 100;
    } else if (data[key] !== undefined) {
      pourcentage = data[key];
    } else {
      pourcentage = Math.floor(Math.random() * 101);
      data[key] = pourcentage;

      // Sauvegarde
      try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      } catch (err) {
        console.error('❌ Erreur écriture lovecalc.json :', err);
      }
    }

    // Choix emoji
    let emoji = '💔';
    if (pourcentage >= 80) emoji = '💖';
    else if (pourcentage >= 60) emoji = '💕';
    else if (pourcentage >= 40) emoji = '💘';
    else if (pourcentage >= 20) emoji = '❤️';

    message.channel.send(
      `💞 **Taux d'amour entre ${sender.username} et ${target.username}** 💞\n` +
      `Résultat : **${pourcentage}%** ${emoji}`
    );
  }
};
