import { InferGetStaticPropsType } from 'next';
import MovieList from '@/templates/MovieList';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { getMovies } from './api/unogsAPI';
import { DateTime } from 'luxon';

const BestMoviesThisWeek = ({
  movies,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Main meta={<Meta title="" description="" />}>
      <MovieList movies={movies} />
    </Main>
  );
};

export async function getStaticProps() {
  const movies = await getMovies(
    DateTime.now().minus({ months: 1 }).toISODate()
  );
  return {
    props: {
      movies,
    },
  };
}

export default BestMoviesThisWeek;
