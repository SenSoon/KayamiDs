import { Player } from 'discord-player';
import extractor from '@discord-player/extractor';

const { YouTubeExtractor } = extractor;

export function createPlayer(client) {
  const player = new Player(client);

  // Enregistre uniquement l'extracteur YouTube (le plus stable)
  player.extractors.register(YouTubeExtractor);

  return player;
}
