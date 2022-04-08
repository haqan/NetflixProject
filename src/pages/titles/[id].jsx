import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { getEntity, getAllPossiblePaths } from '../api/entities';

export default function Title({ titleData = {} }) {
  return (
    <Main meta={<Meta title="" description="" />}>
      <h1>{titleData?.title}</h1>
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

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const titleData = await getEntity(params.id);
  return {
    props: {
      titleData,
    },
  };
}
