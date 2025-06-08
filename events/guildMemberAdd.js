import { trackJoin } from '../utils/antiRaidManager.js';

export default {
  name: 'guildMemberAdd',
  async execute(member) {
    const raidDetected = trackJoin(member);
    if (raidDetected) {
      try {
        await member.kick('Détection anti-raid : trop de joins');
        const channel = member.guild.channels.cache.find(c => c.name === 'mod-logs');
        if (channel) {
          channel.send(`⚠️ Membre ${member.user.tag} kické automatiquement (anti-raid).`);
        }
      } catch (e) {
        console.error('Erreur anti-raid (join) :', e);
      }
    }
  }
};
