export default {
  name: 'rolelist',
  description: 'Liste tous les rôles du serveur avec le nombre de membres.',
  async execute(message) {
    const roles = message.guild.roles.cache
      .filter(role => role.id !== message.guild.id)
      .sort((a, b) => b.position - a.position)
      .map(role => `${role} – \`${role.members.size}\` membres`);

    const chunked = roles.join('\n').match(/(.|[\r\n]){1,1800}/g); // Discord message limit

    for (const chunk of chunked) {
      await message.channel.send(`📋 **Rôles :**\n${chunk}`);
    }
  }
};
