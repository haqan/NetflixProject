import { ReactNode } from 'react';

import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AppConfig } from '@/utils/AppConfig';
import link from 'next/link';

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
        <div className="text-center flex-column self-center justify-center">
          <h1 className="text-2xl m-8">Best rated movies on Netflix </h1>
          <ul className="inline-flex gap-4">
            {links.map((link) => {
              return router.pathname.endsWith(link.href) ? (
                <li>{link.value}</li>
              ) : (
                <li>
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
