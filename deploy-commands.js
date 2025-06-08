import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { REST, Routes } from 'discord.js';

// Init .env
config();

// __dirname workaround (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Variables d'environnement
const { TOKEN, CLIENT_ID, GUILD_ID, OWNER_ID, PREFIX } = process.env;

// Chemin des commandes slash
const commands = [];
const commandsPath = path.join(__dirname, 'commands/slash');
const categories = fs.readdirSync(commandsPath);

for (const category of categories) {
  const categoryPath = path.join(commandsPath, category);
  const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(categoryPath, file);
    const commandModule = await import(`file://${filePath}`);
    const command = commandModule.default;

    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.warn(`❌ La commande à ${filePath} est invalide.`);
    }
  }
}

// Instance REST
const rest = new REST({ version: '10' }).setToken(TOKEN);

// Déploiement
try {
  console.log(`🔄 Déploiement de ${commands.length} commande(s)...`);

  // Enregistrement pour un serveur de test (plus rapide)
  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: commands }
  );

  console.log('✅ Les commandes slash ont été déployées avec succès !');
} catch (error) {
  console.error('❌ Une erreur est survenue lors du déploiement des commandes :', error);
}
