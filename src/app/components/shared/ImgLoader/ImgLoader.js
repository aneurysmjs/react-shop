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
  const image = new Image();
  image.src = src;

  useEffect(() => {
    image.onload = (): void => setImg({ img: image.src, isLoading: false });
    image.onerror = (error: Error): void => {
      setImg({ img: NO_IMAGE, isLoading: false });
      onError(error);
    };
  }, [src, image, onError]);

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
