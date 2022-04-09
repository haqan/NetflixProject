const API_URL_PREFIX = 'https://unogs-unogs-v1.p.rapidapi.com';

export interface NetflixEntity {
  title: string;
  img: string;
  title_type: string;
  netflix_id: number;
  synopsis: string;
  rating: string;
  year: string;
  runtime: string;
  imdb_id: string;
  poster: string;
  top250: number;
  top250tv: number;
  title_date: string;
}

export async function getNetflixEntities(
  releaseDate: string
): Promise<NetflixEntity[] | undefined> {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPID_API_KEY || '',
    },
  };

  const url = `${API_URL_PREFIX}/search/titles?type=movie&new_date=${releaseDate}&order_by=date_asc&country_list=73&limit=80`;
  try {
    const res = await fetch(url, options);
    return (await res.json())?.results as NetflixEntity[];
  } catch (err) {
    console.log('Fetch error', url);
  }
  return undefined;
}

export async function getNetflixEntity(
  netflixId: string
): Promise<NetflixEntity | undefined> {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPID_API_KEY || '',
    },
  };

  const url = `${API_URL_PREFIX}/title/details?netflix_id=${netflixId}`;
  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (err) {
    console.log('Fetch error', url);
  }
  return undefined;
}
