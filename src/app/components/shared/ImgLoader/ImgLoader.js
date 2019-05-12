// @flow strict
import React, { useState } from 'react';

import Spinner from '@/components/base/Spinner/Spinner';

import './ImgLoader.scss';

type PropsType = {
  src: string
};

function ImgLoader({ src }: PropsType) {
  const [imgObj, setImg] = useState({ img: null, isLoading: true });
  const image = new Image();

  image.onload = () => setImg({ img: image.src, isLoading: false });
  image.src = src;

  return (
    imgObj.isLoading ? (<Spinner />) : (<img className="imgLoader img-fluid" src={imgObj.img} alt="img" />)
  );
}

export default ImgLoader;
