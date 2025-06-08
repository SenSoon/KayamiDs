
import { Player } from 'discord-player';
import { YouTubeExtractor } from '@discord-player/extractor';

export async function createPlayer(client) {
  const player = new Player(client);

  // Register the YouTube extractor with the new API
  await player.extractors.register(YouTubeExtractor, {});

  return player;
}
