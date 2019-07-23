// @flow strict
import React, { useState, useEffect } from 'react';

import Spinner from '@/components/base/Spinner/Spinner';

import NO_IMAGE from '@/assets/img/no-image.png';

import './ImgLoader.scss';

type PropsType = {
  src: string,
  onError: (error: Error) => void
};

function ImgLoader({ src, onError }: PropsType) {
  const [imgObj, setImg] = useState({ img: null, isLoading: true });
  // eslint-disable-next-line no-console
  console.log('imgObj', imgObj);

  const image = new Image();
  image.src = src;

  const applyImage = (img: string): void => {
    setImg({ img, isLoading: false });
  };

  useEffect(() => {
    image.onload = (): void => applyImage(image.src);
    image.onerror = (error: Error): void => {
      applyImage(NO_IMAGE);
      onError(error);
    };
    return function cleanup() {
      image.onload = null;
      image.onerror = null;
    };
    // [] tells React that your effect doesn’t depend on any values from props or state,
    // so it never needs to re-run.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    imgObj.isLoading ? (
      <span className="imgLoader__spinner">
        <Spinner />
      </span>
    ) : (<img className="imgLoader" src={imgObj.img} alt="img" />)
  );
}

ImgLoader.defaultProps = {
  onError: () => {},
};

export default ImgLoader;
