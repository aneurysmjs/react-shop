import React, { useState, useEffect, memo } from 'react';

import Spinner from '~/components/base/Spinner';

import NO_IMAGE from '~/assets/img/no-image.png';

import './ImgLoader.scss';

type PropsType = {
  src: string;
  onError?: (error: string | Event) => void;
};

function ImgLoader({ src, onError }: PropsType): React.ReactElement {
  const [imgObj, setImg] = useState({ img: '', isLoading: true });

  const image = new Image();
  image.src = src;

  const applyImage = (img: string): void => {
    setImg({ img, isLoading: false });
  };

  useEffect(() => {
    image.onload = (): void => applyImage(image.src);
    image.onerror = (error): void => {
      applyImage(NO_IMAGE);
      if (onError) {
        onError(error);
      }
    };
    return function cleanup(): void {
      image.onload = null;
      image.onerror = null;
    };
    // [] tells React that your effect doesn’t depend on any values from props or state,
    // so it never needs to re-run.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return imgObj.isLoading ? (
    <span className="imgLoader__spinner">
      <Spinner />
    </span>
  ) : (
    <img className="imgLoader" src={imgObj.img} alt="img" />
  );
}

export default memo<PropsType>(ImgLoader);
