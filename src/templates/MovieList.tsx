import { Movie } from '@/pages/api/utils';

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

const MovieList = ({ movies }: { movies: Movie[] }) => {
  if (!movies) return null;
  return (
    <ul className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {movies.map((movie) => (
        <li key={movie.title}>
          <a
            href={`https://www.netflix.com/watch/${movie.netflix_id}`}
            target="_blank"
            rel="noreferrer"
            className="relative flex h-full w-full flex-col rounded-md bg-black text-white"
          >
            <img
              src={movie.img}
              className="w-full rounded-t-md object-contain"
              alt={movie.title}
            />
            <div className="p-4">
              <p className="flex w-full gap-2 self-center items-center">
                <Star /> {movie?.imdb?.imdbRating}
              </p>
              <p className="w-full">{movie.title}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
