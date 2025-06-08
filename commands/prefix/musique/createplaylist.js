export default {
  name: 'createplaylist',
  async execute(message, args) {
    const [playlistName] = args;
    if (!playlistName) return message.reply("❌ Donne un nom à ta playlist.");

    const { loadPlaylists, savePlaylists } = await import('../../utils/playlistStorage.js');
    const playlists = loadPlaylists();

    const key = `${message.author.id}_${playlistName}`;
    if (playlists[key]) return message.reply("⚠️ Playlist déjà existante.");

    playlists[key] = [];
    savePlaylists(playlists);
    message.reply(`✅ Playlist \`${playlistName}\` créée.`);
  }
};
