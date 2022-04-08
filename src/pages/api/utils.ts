import { Entity } from './entities';

export function sortByImdbRating(a: Entity, b: Entity) {
  if (!a.imdb || !b.imdb) return 0;
  if (a.imdb.imdbRating > b.imdb.imdbRating) {
    return -1;
  }
  if (a.imdb.imdbRating < b.imdb.imdbRating) {
    return 1;
  }
  return 0;
}
