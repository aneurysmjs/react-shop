// @flow strict
import React, { useState, useEffect } from 'react';

import Spinner from '@/components/base/Spinner/Spinner';

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
    image.onerror = (error: Error): void => onError(error);
  }, [src, image, onError]);

  return (
    imgObj.isLoading ? (<Spinner />) : (<img className="imgLoader img-fluid" src={imgObj.img} alt="img" />)
  );
}

ImgLoader.defaultProps = {
  onError: () => {},
};

export default ImgLoader;
