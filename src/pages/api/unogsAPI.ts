import { getImdbData } from './imdb';
import { sortMovies, Movie } from './utils';

async function getNetflixData(releaseDate: string) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'Th1V3MxFGBmshvwrXsoQYJM1DKP5p1KyEeejsnltU7fpC6ZQNA',
    },
  };

  const url = `https://unogs-unogs-v1.p.rapidapi.com/search/titles?type=movie&new_date=${releaseDate}&order_by=date_asc&limit=30`;
  try {
    const res = await fetch(url, options);
    return (await res.json())?.results as Movie[];
  } catch (err) {
    console.log('Fetch error', url);
  }
  return [];
}

export async function getMovies(releaseDate: string) {
  const netflix = await getNetflixData(releaseDate);
  const movies = (
    await Promise.all(
      netflix.map(async (n) => ({
        ...n,
        imdb: await getImdbData(n.title),
      }))
    )
  )
    .filter((m) => m.imdb.imdbRating > 0)
    .sort(sortMovies);
  return movies;
}
