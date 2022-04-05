import { ReactNode } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const links = [
  {
    href: '/best-movies-this-week',
    value: 'this week • ',
  },
  {
    href: '/best-movies-this-month',
    value: 'this month • ',
  },
  {
    href: '/best-movies-this-year',
    value: 'this year',
  },
];

function Main(props: IMainProps) {
  const router = useRouter();

  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      {props.meta}

      <div className="mx-auto max-w-screen-2xl">
        <div className="border-b border-gray-300">
          <div className="pt-16 pb-8">
            <div className="text-3xl font-bold text-gray-900">
              {AppConfig.title}
            </div>
            <div className="text-xl">{AppConfig.description}</div>
          </div>
        </div>
        <h1 className="text-2xl">Best rated movies on Netflix </h1>
        <p>
          {links.map((link) => {
            return router.pathname.endsWith(link.href) ? (
              link.value
            ) : (
              <>
                <Link href={link.href}>{link.value}</Link>
              </>
            );
          })}
        </p>
        <div className="content py-5 text-xl">{props.children}</div>
      </div>
    </div>
  );
}

export { Main };
