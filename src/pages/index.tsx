import { InferGetStaticPropsType } from 'next';

import { Main } from '@/templates/Main';
import MovieList from '@/templates/MovieList';

import { Meta } from '@/layout/Meta';

import { getEntities } from './api/entities';

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
  const entities = await getEntities(
    DateTime.now().minus({ months: 1 }).toISODate()
  );
  return {
    props: {
      entities,
    },
  };
}

export default BestMoviesThisWeek;
