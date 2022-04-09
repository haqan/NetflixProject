import { ReactNode } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const links = [
  {
    href: '/best-movies-this-week',
    value: 'This week',
  },
  {
    href: '/best-movies-this-month',
    value: 'This month',
  },
  {
    href: '/best-movies-this-year',
    value: 'This year',
  },
];

function Main(props: IMainProps) {
  const router = useRouter();
  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      {props.meta}
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex-column justify-center self-center text-center">
          <h1 className="m-8 text-2xl">Best movies on Netflix</h1>
          <ul className="inline-flex gap-4 text-xl">
            {links.map((link) => {
              return router.pathname.endsWith(link.href) ? (
                <li key={link.value}>{link.value}</li>
              ) : (
                <li key={link.value}>
                  <Link href={link.href}>{link.value}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="content py-5 text-xl">{props.children}</div>
      </div>
    </div>
  );
}

export { Main };
