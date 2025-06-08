import { trackMessage } from '../utils/antiRaidManager.js';

export default {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;

    // Anti-spam basique
    const isSpam = trackMessage(message);
    if (isSpam) {
      try {
        await message.member.timeout(60_000, 'Spam détecté par le système anti-raid');
        await message.channel.send(`⚠️ ${message.author} a été timeout pour spam.`);
      } catch (e) {
        console.error('Erreur anti-raid (message) :', e);
      }
    }

    // Gestion normale des commandes prefix ici...
  }
};

client.on('messageCreate', message => {
  // Ignore les messages qui ne commencent pas par le prefix ou venant d’un bot
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

  // Extraction du nom de la commande et des arguments
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Récupération de la commande dans la collection
  const command = client.prefixCommands.get(commandName);
  if (!command) return; // Si commande inconnue, on ignore

  // Vérification permission propriétaire si nécessaire
  if (command.ownerOnly && message.author.id !== process.env.OWNER_ID) {
    return message.reply("Tu n'as pas la permission d'utiliser cette commande.");
  }

  try {
    // Exécution de la commande
    command.execute(message, args);
  } catch (error) {
    console.error(`Erreur sur la commande ${commandName} :`, error);
    message.reply("Une erreur est survenue lors de l'exécution de la commande.");
  }
});
