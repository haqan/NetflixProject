import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Entity } from '@/pages/api/entities';
import Button from '@mui/material/Button';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: 'rgb(127 29 29)',
          borderColor: '#888',
          borderWidth: '1px',

          '&:hover': {
            backgroundColor: 'rgb(239 68 68)',
            borderColor: '#888',
          },
        },
      },
    },
  },
});

const Star = () => {
  return (
    <svg
      width="24"
      height="24"
      className="w-4"
      viewBox="0 0 24 24"
      fill="#f5c518"
      role="presentation"
    >
      <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
    </svg>
  );
};

const MovieList = ({ entities }: { entities: Entity[] }) => {
  if (!entities) return null;
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {entities.map((movie) => (
        <li
          key={movie.netflix_id}
          className="relative flex h-full w-full flex-col rounded-md bg-black text-white"
        >
          <a href={movie.internalLink} target="_blank" rel="noreferrer">
            <img
              src={movie.img}
              className="w-full rounded-t-md object-contain"
              alt={movie.title}
            />
          </a>
          <div className="flex h-full flex-col p-4 text-base">
            <div className="flex gap-2 self-end">
              <a
                className="flex gap-2 text-white"
                href={`https://www.imdb.com/title/${movie.imdb?.imdbID}`}
              >
                {' '}
                <span className="text-slate-500">IMDB:</span> <Star />
                {movie?.imdb?.imdbRating}
              </a>
            </div>
            <p className="h-full w-full self-center">{movie.title}</p>
            <ThemeProvider theme={theme}>
              <Button
                className="self-center text-xs antialiased"
                variant="outlined"
                target="_blank"
                rel="noreferrer"
                href={`https://www.netflix.com/watch/${movie.netflix_id}`}
              >
                Watch on Netflix
              </Button>
            </ThemeProvider>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
