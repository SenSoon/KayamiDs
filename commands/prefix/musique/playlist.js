export default {
  name: 'playplaylist',
  async execute(message, args) {
    const [playlistName] = args;
    if (!playlistName) return message.reply("❌ Utilisation : `playplaylist <nom>`");

    const { loadPlaylists } = await import('../../utils/playlistStorage.js');
    const playlists = loadPlaylists();
    const key = `${message.author.id}_${playlistName}`;
    const list = playlists[key];
    if (!list || !list.length) return message.reply("❌ Playlist vide ou inexistante.");

    const player = useMainPlayer();
    for (const song of list) {
      await player.play(message.member.voice.channel, song, {
        nodeOptions: {
          metadata: message
        }
      });
    }

    message.reply(`▶️ Playlist \`${playlistName}\` lancée.`);
  }
};
