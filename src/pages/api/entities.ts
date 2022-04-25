import { getImdbData } from './imdb';
import {
  getMovies,
  getMovieDetails,
  getConfig,
  Movie,
  MovieDetails,
} from './themoviedb';

export interface Entity extends Movie, MovieDetails {
  imdbRating: string;
  internalLink: string;
  img: string;
}

function sortByImdbRating(a: Entity, b: Entity) {
  if (a.imdbRating > b.imdbRating) {
    return -1;
  }
  if (a.imdbRating < b.imdbRating) {
    return 1;
  }
  return 0;
}

export async function getEntitiesByDate(releaseDate: string) {
  const config = await getConfig();
  const movies = await getMovies(releaseDate);
  const entities = (
    await Promise.all(
      movies.map(async (m) => {
        return {
          ...m,
          ...(await getMovieDetails(m.id.toString())),
          imdbRating: (await getImdbData(m.title, m.release_date.slice(0, 4)))
            ?.imdbRating,
          internalLink: `/movie/${m.id}`,
          img: `${config.images.base_url}original${m.poster_path}`,
        };
      })
    )
  )
    .filter((m) => m.homepage?.includes('netflix') && m.imdbRating)
    .sort(sortByImdbRating);
  return entities;
}

export async function getEntities(releaseDate: string): Promise<Entity[]> {
  return getEntitiesByDate(releaseDate);
}

export async function getEntity(id: string) {
  return {
    ...(await getMovieDetails(id)),
  };
}

export async function getAllPossiblePaths() {
  const entities = await getEntitiesByDate('2022-01-01');
  return entities.map((m) => ({
    params: { id: m.id.toString() },
  }));
}
