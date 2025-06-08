export default {
  name: 'reload',
  description: 'Recharge une commande (owner only)',
  ownerOnly: true,
  async execute(message, args) {
    if (!args[0]) return message.reply("Commande manquante.");
    const commandName = args[0].toLowerCase();

    try {
      delete require.cache[require.resolve(`./${commandName}.js`)];
      const newCommand = (await import(`./${commandName}.js?update=${Date.now()}`)).default;
      message.client.prefixCommands.set(newCommand.name, newCommand);
      message.reply(`✅ Commande \`${commandName}\` rechargée.`);
    } catch (err) {
      console.error(err);
      message.reply(`❌ Erreur lors du rechargement.`);
    }
  }
};
