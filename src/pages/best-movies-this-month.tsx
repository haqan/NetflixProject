import { InferGetStaticPropsType } from 'next';
import MovieList from '@/templates/MovieList';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { getEntitiesByDate } from './api/entities';
import { DateTime } from 'luxon';

const BestMoviesThisWeek = ({
  entities,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Main meta={<Meta title="" description="" />}>
      <MovieList entities={entities} />
    </Main>
  );
};

export async function getStaticProps() {
  const entities = await getEntitiesByDate(
    DateTime.now().minus({ months: 3 }).toISODate()
  );
  return {
    props: {
      entities,
    },
  };
}

export default BestMoviesThisWeek;
