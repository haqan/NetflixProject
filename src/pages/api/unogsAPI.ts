import { getImdbData } from './imdb';
import { sortMovies, Movie } from './utils';

async function getNetflixData(releaseDate: string) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPID_API_KEY || '',
    },
  };

  const url = `https://unogs-unogs-v1.p.rapidapi.com/search/titles?type=movie&new_date=${releaseDate}&order_by=date_asc&country_list=73&limit=50`;
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
  const addedTitles = new Set();
  const movies = (
    await Promise.all(
      netflix.map(async (n) => ({
        ...n,
        imdb: await getImdbData(n.title),
      }))
    )
  )
    .filter((m) => {
      const duplicate = addedTitles.has(m.title);
      addedTitles.add(m.title);
      return !duplicate && m.imdb.imdbRating > 0;
    })
    .sort(sortMovies);

  return movies;
}
