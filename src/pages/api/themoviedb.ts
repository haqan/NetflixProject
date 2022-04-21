export const API_URL_PREFIX = 'https://api.themoviedb.org/3';

export interface Config {
  images: Images;
  change_keys: string[];
}

export interface Images {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: any[];
  production_countries: any[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export async function getConfig(): Promise<Config> {
  const url = `${API_URL_PREFIX}/configuration?api_key=${process.env.THE_MOVIE_DB_API_KEY}`;
  const res = await fetch(url);
  return res.json();
}

async function fetchDiscoverMovies(releaseDate, page = 1) {
  const url = `${API_URL_PREFIX}/discover/movie?primary_release_date.gte=${releaseDate}&api_key=${process.env.THE_MOVIE_DB_API_KEY}&with_watch_providers=8&watch_region=SE&sort_by=vote_average.desc&vote_count.gte=100&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getMovies(releaseDate: string): Promise<Movie[]> {
  const data = await fetchDiscoverMovies(releaseDate, 1);
  const movies = data.results;
  const promises = [];
  let page = 2;
  while (page <= data.total_pages) {
    promises.push(fetchDiscoverMovies(releaseDate, page++));
  }
  const allMovies = (await Promise.all(promises)).map((m) => m.results);
  return [...movies, ...allMovies.flat()];
}

export async function getMovieDetails(
  id: number
): Promise<MovieDetails | undefined> {
  const url = `${API_URL_PREFIX}/movie/${id}?api_key=${process.env.THE_MOVIE_DB_API_KEY}`;

  try {
    const res = await fetch(url);
    return (await res.json()) as MovieDetails;
  } catch (err) {
    console.log('Fetch error', url);
  }
  return undefined;
}
