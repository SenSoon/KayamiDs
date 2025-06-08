export default {
  name: 'addlist',
  async execute(message, args) {
    const [playlistName, ...music] = args;
    const query = music.join(" ");
    if (!playlistName || !query) return message.reply("❌ Utilisation : `addlist <playlist> <musique>`");

    const { loadPlaylists, savePlaylists } = await import('../../utils/playlistStorage.js');
    const playlists = loadPlaylists();

    const key = `${message.author.id}_${playlistName}`;
    if (!playlists[key]) return message.reply("❌ Playlist introuvable.");

    playlists[key].push(query);
    savePlaylists(playlists);
    message.reply(`✅ Ajouté à \`${playlistName}\` : ${query}`);
  }
};
