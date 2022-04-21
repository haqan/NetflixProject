import {
  getMovies,
  getMovieDetails,
  getConfig,
  Movie,
  MovieDetails,
} from './themoviedb';

export interface Entity extends Movie, MovieDetails {
  internalLink: string;
  img?: string;
}

export async function getEntitiesByDate(releaseDate) {
  const config = await getConfig();
  const movies = await getMovies(releaseDate);
  const entities = (
    await Promise.all(
      movies.map(async (m) => {
        return {
          ...m,
          ...(await getMovieDetails(m.id)),
          internalLink: `/movie/${m.id}`,
          img: `${config.images.base_url}original${m.poster_path}`,
        };
      })
    )
  ).filter((m) => m.homepage);
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
