import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import { setupDestructiveListeners } from './events/antiraidManager.js';
import { registerSnipe } from './events/messageDelete.js';
import { hasAccess } from './utils/hasAccess.js';
import voiceStateUpdate from './events/voiceStateUpdate.js';


// Initialisation __dirname pour ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
config();

// Créer le client Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences
  ],
});

client.prefixCommands = new Collection();
client.slashCommands = new Collection();

client.on('voiceStateUpdate', (oldState, newState) => {
  voiceStateUpdate.execute(oldState, newState);
});

client.once('ready', async () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
  registerSnipe(client);
});

// Fonction pour charger les commandes depuis les sous-dossiers
function loadCommands(folderPath, collection, isSlash = false) {
  const categories = fs.readdirSync(folderPath);
  for (const category of categories) {
    const categoryPath = path.join(folderPath, category);
    const commandFiles = fs
      .readdirSync(categoryPath)
      .filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const commandPath = path.join(categoryPath, file);
      import(`file://${commandPath}`).then(command => {
        if (isSlash) {
          collection.set(command.default.data.name, command.default);
        } else {
          collection.set(command.default.name, command.default);
        }
      });
    }
  }
}

// Chargement des commandes
loadCommands(path.join(__dirname, 'commands/prefix'), client.prefixCommands);
loadCommands(path.join(__dirname, 'commands/slash'), client.slashCommands, true);



// Gestion des commandes prefix
client.on('messageCreate', message => {
  const prefixFile = path.resolve('data/prefixes.json');
  let prefixes = {};
  if (fs.existsSync(prefixFile)) {
    prefixes = JSON.parse(fs.readFileSync(prefixFile, 'utf8'));
  }
  const guildPrefix = prefixes[message.guild?.id] || process.env.PREFIX;

  if (!message.content.startsWith(guildPrefix) || message.author.bot) return;

  const args = message.content.slice(guildPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.prefixCommands.get(commandName);
  if (!command) return;

  // ✅ Vérifie les permissions via hasAccess (owner OU whitelist OU permission)
  if (command.ownerOnly && !hasAccess(message)) {
    return message.reply("⛔ Tu n'as pas la permission d'utiliser cette commande.");
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("❌ Une erreur est survenue.");
  }
});

// Gestion des commandes slash
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.slashCommands.get(interaction.commandName);
  if (!command) return;

  if (command.ownerOnly && interaction.user.id !== process.env.OWNER_ID) {
    return interaction.reply({ content: "⛔ Tu n'as pas la permission.", ephemeral: true });
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "❌ Une erreur est survenue.", ephemeral: true });
  }
});

// Connexion au bot
client.login(process.env.TOKEN);

