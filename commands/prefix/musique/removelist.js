export default {
  name: 'removelist',
  async execute(message, args) {
    const [playlistName] = args;
    if (!playlistName) return message.reply("❌ Utilisation : `removelist <nom>`");

    const { loadPlaylists, savePlaylists } = await import('../../utils/playlistStorage.js');
    const playlists = loadPlaylists();
    const key = `${message.author.id}_${playlistName}`;

    if (!playlists[key]) return message.reply("❌ Playlist introuvable.");
    delete playlists[key];
    savePlaylists(playlists);
    message.reply(`🗑️ Playlist \`${playlistName}\` supprimée.`);
  }
};
