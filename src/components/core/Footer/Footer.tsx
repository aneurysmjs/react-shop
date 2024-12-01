import type { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="w-full">
      <div
        className={`
          mx-auto px-4

          lg:px-8

          sm:px-6
        `}
      >
        <p className="py-2 text-center">Made with love by Jero</p>
      </div>
    </footer>
  );
};

export default Footer;
