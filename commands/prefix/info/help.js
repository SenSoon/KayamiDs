import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';

export default {
  name: 'help',
  description: 'Affiche la liste des commandes',
  async execute(message, args, client) {
    const categories = {
      Info: [
        { name: 'help', description: 'Affiche la liste des commandes.'},
        { name: 'ping', description: 'Affiche la latence du bot.'},
        { name: 'botinfo', description: 'Affiche les informations du bot.'},
        { name: 'botinvite', description: 'Affiche le lien d’invitation du bot.'},
        { name: 'channelinfo', description: 'Affiche les informations du salon.'},
        { name: 'serverinfo', description: 'Affiche les informations du serveur.'},
        { name: 'userinfo', description: 'Affiche les informations de l’utilisateur.'},
        { name: 'roleinfo', description: 'Affiche les informations du rôle.'},
        { name: 'rolelist', description: 'Affiche la liste des rôles.'},
        { name: 'uptime', description: 'Affiche le temps de fonctionnement du bot.'},
        { name: 'id', description: 'Affiche les ID d un utilisateur salon ou serveur.'}
        
      ],
      Modération: [
        { name: 'addrole', description: 'Ajoute un rôle à un membre.'},
        { name: 'addsalon', description: 'Créer un salon texte ou vocal.'},
        { name: 'ban', description: 'Bannit un membre.'},
        { name: 'clear', description: 'Supprime des messages.'},
        { name: 'delrole', description: 'Supprime un rôle à un membre.'},
        { name: 'delsalon', description: 'Supprime un salon.'},
        { name: 'history', description: 'Affiche l historique des sanctions d un membre.'},
        { name: 'kick', description: 'Expulse un membre.'},
        { name: 'kickvoc', description: 'Expulse un membre de son salon vocal.'},
        { name: 'kickvocall', description: 'Expulse tous les membres d un salon vocal.'},
        { name: 'lock', description: 'Verrouille un salon.'},
        { name: 'lockall', description: 'Verrouille tous les salons.'},
        { name: 'mute', description: 'Rend muet un membre.'},
        { name: 'muted', description: 'Affiche la liste des membres muets.'},
        { name: 'nuke', description: 'Recrée un salon.'},
        { name: 'removewarn', description: 'Retire un avertissement.'},
        { name: 'report', description: 'Signale un membre au staff.'},
        { name: 'resetwarn', description: 'Réinitialise les avertissements d un membre.'},
        { name: 'rolecreate', description: 'Crée un rôle.'},
        { name: 'rolesupr', description: 'Supprime un rôle.'},
        { name: 'shadowmute', description: 'Isole un membre dans un salon invisible.'},
        { name: 'slowmode', description: 'Active le mode lent.'},
        { name: 'snipe', description: 'Affiche le dernier message supprimé.'},
        { name: 'softban', description: 'Bannit puis débannit un membre.'},
        { name: 'unban', description: 'Débannit un membre.'},
        { name: 'unlock', description: 'Déverrouille un salon.'},
        { name: 'unlockall', description: 'Déverrouille tous les salons.'},
        { name: 'unmute', description: 'Démute un membre.'},
        { name: 'warn', description: 'Avertit un membre.'},
        { name: 'warnings', description: 'Affiche les avertissements d un membre.'}
      ],
      Utilitaire: [
        { name: 'avatar', description: 'Affiche l avatar d un utilisateur.'},
        { name: 'calc', description: 'Calcule une expression.'},
        { name: 'embed', description: 'Crée un embed.'},
        { name: 'say', description: 'Fait parler le bot.'},
        { name: 'servericon', description: 'Affiche l icône du serveur.'},
        { name: 'steal', description: 'Voler un emoji.'},
        { name: 'nick', description: 'Renomme un membre.'}
      ],
      Vocal: [
        { name: 'vc allow', description: 'Autorise un membre à rejoindre ton salon vocal temporaire'},
        { name: 'vc deny', description: 'Retire l’accès à un membre' },
        { name: 'vc lock', description: 'Verrouille ton salon vocal' },
        { name: 'vc unlock', description: 'Déverrouille ton salon vocal'}
      ],
      Fun: [
        { name: 'lovecalc', description: 'Calcule le pourcentage d’amour entre deux personnes.'},
        { name: 'meme', description: 'Affiche un meme aléatoire.'},
        { name: 'poll', description: 'Crée un sondage.'},
        { name: 'pp', description: 'Affiche la taille du pénis d’un membre.'},
        { name: '8ball', description: 'Pose une question au bot.'},
        { name: 'note', description: 'Note quelque chose sur 10.'},
        { name: 'dog', description: 'Affiche une image de chien aléatoire.'},
        { name: 'cat', description: 'Affiche une image de chat aléatoire.'},
        
      ],
      Owner: [
        { name: 'antiraid', description: 'Active ou désactive l’anti-raid'},
        { name: 'Backup', description: 'Effectue une sauvegarde du serveur'},
        { name: 'blacklist', description: 'Ajoute ou retire un membre de la blacklist'},
        { name: 'leaveguild', description: 'Quitte un serveur'},
        { name: 'reload', description: 'Recharge une commande'},
        { name: 'restart', description: 'Redémarre le bot'},
        { name: 'restorebackup', description: 'Restaure les rôles et salons à partir d’un fichier de backup.'},
        { name: 'setprefix', description: 'Change le préfixe du bot'},
        { name: 'setwelcome', description: 'Configure le message de bienvenue'},
        { name: 'setleave', description: 'Configure le message de départ'},
        { name: 'serverlist', description: 'Affiche la liste des serveurs dans lesquels le bot est présent'},
        { name: 'setjoinchannel', description: 'Configure le salon de création de salon vocal'},
        { name: 'shutdown', description: 'Éteint le bot'},
        { name: 'whitelist', description: 'Ajoute ou retire un membre de la whitelist'},
      ]     
    };

    const categoryList = Object.keys(categories);
    let currentIndex = 0;

    const generateEmbed = index => {
      const catName = categoryList[index];
      const commands = categories[catName];

      const embed = new EmbedBuilder()
        .setTitle(`📖 Aide - Catégorie : ${catName}`)
        .setDescription(commands.map(cmd => `\`+${cmd.name}\` - ${cmd.description}`).join('\n'))
        .setColor(0x5865f2)
        .setFooter({ text: `Catégorie ${index + 1} sur ${categoryList.length}` });

      return embed;
    };

    const components = index => {
      return [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('prev')
            .setLabel('◀️ Précédent')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(index === 0),
          new ButtonBuilder()
            .setCustomId('next')
            .setLabel('Suivant ▶️')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(index === categoryList.length - 1)
        )
      ];
    };

    const msg = await message.reply({
      embeds: [generateEmbed(currentIndex)],
      components: components(currentIndex)
    });

    const collector = msg.createMessageComponentCollector({
      time: 60_000,
      filter: i => i.user.id === message.author.id
    });

    collector.on('collect', async interaction => {
      if (interaction.customId === 'prev' && currentIndex > 0) currentIndex--;
      else if (interaction.customId === 'next' && currentIndex < categoryList.length - 1) currentIndex++;

      await interaction.update({
        embeds: [generateEmbed(currentIndex)],
        components: components(currentIndex)
      });
    });

    collector.on('end', async () => {
      msg.edit({ components: [] }).catch(() => null);
    });
  }
};
