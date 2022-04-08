export interface IMDB {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: string[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export async function getImdbData(
  title: string,
  year: string
): Promise<IMDB | undefined> {
  const url = `https://www.omdbapi.com/?apikey=1ffc9d4b&t=${title}`;
  try {
    const imdbDataRes = await fetch(url);
    const result = await imdbDataRes.json();
    const finalResult =
      result.imdbRating !== 'N/A'
        ? {
            ...result,
            imdbRating: result.imdbRating,
          }
        : null;
    return finalResult;
  } catch (err) {
    console.log('Fetch error IMDB', url);
  }
  return;
}
