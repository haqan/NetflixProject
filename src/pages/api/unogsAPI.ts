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

function compare(a: Movie, b: Movie) {
  if (a.imdb.imdbRating > b.imdb.imdbRating) {
    return -1;
  }
  if (a.imdb.imdbRating < b.imdb.imdbRating) {
    return 1;
  }
  return 0;
}

async function getNetflixData(releaseDate: string) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'Th1V3MxFGBmshvwrXsoQYJM1DKP5p1KyEeejsnltU7fpC6ZQNA',
    },
  };

  const url = `https://unogs-unogs-v1.p.rapidapi.com/search/titles?type=movie&new_date=${releaseDate}&order_by=date_asc&limit=5`;
  const res = await fetch(url, options);
  return (await res.json())?.results as Movie[];
}

async function getImdbData(title: string) {
  const url = `https://www.omdbapi.com/?apikey=1ffc9d4b&t=${title}`;
  const imdbDataRes = await fetch(url);
  const result = await imdbDataRes.json();
  return result;
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
    .sort(compare);
  return movies;
}
