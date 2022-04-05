export interface Movie {
  title: string;
  img: string;
  title_type: string;
  netflix_id: number;
  synopsis: string;
  rating: string;
  year: string;
  title_date: string;
  imdb: any;
}

export function sortMovies(a: Movie, b: Movie) {
  if (a.imdb.imdbRating > b.imdb.imdbRating) {
    return -1;
  }
  if (a.imdb.imdbRating < b.imdb.imdbRating) {
    return 1;
  }
  return 0;
}
