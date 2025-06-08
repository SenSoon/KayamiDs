export default {
  name: 'viewplaylist',
  async execute(message, args) {
    const [playlistName] = args;
    if (!playlistName) return message.reply("❌ Utilisation : `viewplaylist <nom>`");

    const { loadPlaylists } = await import('../../utils/playlistStorage.js');
    const playlists = loadPlaylists();
    const key = `${message.author.id}_${playlistName}`;
    const list = playlists[key];

    if (!list) return message.reply("❌ Playlist introuvable.");
    if (!list.length) return message.reply("⚠️ Playlist vide.");

    const content = list.map((item, i) => `${i + 1}. ${item}`).join('\n');
    message.reply(`📃 **${playlistName}**\n${content}`);
  }
};
