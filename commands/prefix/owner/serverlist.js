export default {
  name: 'serverlist',
  description: 'Liste les serveurs du bot (owner only)',
  ownerOnly: true,
  execute(message) {
    const list = message.client.guilds.cache.map(g => `${g.name} (ID: ${g.id})`);
    message.reply(`📋 Serveurs :\n\`\`\`\n${list.join('\n').slice(0, 1900)}\n\`\`\``);
  }
};
