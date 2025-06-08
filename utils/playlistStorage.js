import fs from 'fs';
const path = './data/playlists.json';

export function loadPlaylists() {
  if (!fs.existsSync(path)) fs.writeFileSync(path, '{}');
  return JSON.parse(fs.readFileSync(path));
}

export function savePlaylists(playlists) {
  fs.writeFileSync(path, JSON.stringify(playlists, null, 2));
}
