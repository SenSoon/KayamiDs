import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Affiche la latence du bot et de l\'API'),
  ownerOnly: false,

  async execute(interaction) {
    const sent = await interaction.reply({ content: '🏓 Ping en cours...', fetchReply: true });

    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);

    await interaction.editReply(`🏓 Pong !\n🟢 Latence : \`${latency}ms\`\n⚙️ Latence API : \`${apiLatency}ms\``);
  }
};
