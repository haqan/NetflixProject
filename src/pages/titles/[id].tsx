import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { getEntity, getAllPossiblePaths } from '../api/entities';
import { NetflixEntity } from '../api/netflix';

export default function Title({ title }: NetflixEntity) {
  return (
    <Main meta={<Meta title="" description="" />}>
      <h1>{title}</h1>
    </Main>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = await getAllPossiblePaths();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  // Fetch necessary data for the blog post using params.id
  const entity = await getEntity(params.id);
  return {
    props: {
      entity,
    },
  };
}
