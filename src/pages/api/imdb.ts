export async function getImdbData(title: string) {
  const url = `https://www.omdbapi.com/?apikey=1ffc9d4b&t=${title}`;
  try {
    const imdbDataRes = await fetch(url);
    const result = await imdbDataRes.json();
    return result;
  } catch (err) {
    console.log('Fetch error IMDB', url);
  }
  return {};
}
