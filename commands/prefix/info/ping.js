export default {
  name: 'ping',
  description: 'Affiche la latence du bot et de l\'API',
  ownerOnly: false,

  async execute(message) {
    const sent = await message.channel.send('🏓 Ping en cours...');
    const latency = sent.createdTimestamp - message.createdTimestamp;
    const apiLatency = Math.round(message.client.ws.ping);

    sent.edit(`🏓 Pong !\n🟢 Latence : \`${latency}ms\`\n⚙️ Latence API : \`${apiLatency}ms\``);
  }
};
