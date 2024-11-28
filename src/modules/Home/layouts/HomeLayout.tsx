import type { FC, PropsWithChildren } from 'react';

type HomeLayoutProps = PropsWithChildren;

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
  return (
    <section className="my-8 flex h-full items-start justify-center">
      <div
        className={`
          mx-auto w-full px-4

          md:w-9/12 md:px-0
        `}
      >
        {children}
      </div>
    </section>
  );
};

export default HomeLayout;
