import { InferGetStaticPropsType } from 'next';
import MovieList from '@/templates/MovieList';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { getMovies } from './api/unogsAPI';
import { DateTime } from 'luxon';

const BestMoviesThisMonth = ({
  moviesMonth,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Main meta={<Meta title="" description="" />}>
      <MovieList movies={moviesMonth} />
    </Main>
  );
};

export async function getStaticProps() {
  const moviesMonth = await getMovies(
    DateTime.now().minus({ weeks: 1 }).toISODate()
  );
  return {
    props: {
      moviesMonth,
    },
  };
}

export default BestMoviesThisMonth;
