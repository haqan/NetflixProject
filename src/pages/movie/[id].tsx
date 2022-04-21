import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { getEntity, getAllPossiblePaths } from '../api/entities';

export default function Title(props = {}) {
  const { title, tagline } = props.entity;
  console.table(props.entity);
  return (
    <Main meta={<Meta title="" description="" />}>
      <article className="flex flex-col justify-center items-center">
        <h1 className="text-2xl">{title}</h1>
        <h2>{tagline}</h2>
      </article>
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
