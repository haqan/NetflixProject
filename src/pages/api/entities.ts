import { getNetflixEntities, getNetflixEntity, NetflixEntity } from './netflix';
import { getImdbData, IMDB } from './imdb';
import { sortByImdbRating } from './utils';

export interface Entity extends NetflixEntity {
  imdb?: IMDB;
}

export async function getEntities(releaseDate: string): Promise<Entity[]> {
  const netflixEntities = (await getNetflixEntities(releaseDate)) || [];
  const addedEntities = new Set();
  const handledEntities = (
    await Promise.all(
      netflixEntities.map(async (n) => ({
        ...n,
        imdb: await getImdbData(n.title, n.year),
      }))
    )
  )
    .filter((m) => {
      const duplicate = addedEntities.has(m.title);
      addedEntities.add(m.title);
      return !duplicate && m.imdb?.imdbRating;
    })
    .sort(sortByImdbRating);
  return handledEntities;
}

export async function getEntity(id: string) {
  return await getNetflixEntity(id);
}

export async function getAllPossiblePaths() {
  const netflixEntities = (await getNetflixEntities('2022-01-01')) || [];
  return netflixEntities.map((m) => ({
    params: { id: m.netflix_id.toString() },
  }));
}
