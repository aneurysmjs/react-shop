/* eslint-disable prettier/prettier */
import React, { useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AlienResult } from '~/store/config/alienStore/useAlien';

import Spinner from '~/components/base/Spinner';
import ProductCard from '~/components/common/ProductCard';

import { ProductsStateType } from '~/store/modules/products/types';

import './Home.scss';

type PropsType = AlienResult;

const Home = (props: PropsType): ReactElement => {
  const dispatch = useDispatch();
  const { isLoading, products, error }: ProductsStateType = useSelector(props.selectors.getProducts);

  useEffect(() => {
    dispatch(props.actions.fetchProducts(`/products`));
  }, [dispatch, props.actions]);

  return (
    <div className="home">
      <h2 className="home__title">Shop</h2>
      <div className="row">
        {error ? <span className="home__loader">{error.message}</span> : null}
        {isLoading ? (
          <span className="home__loader">
            <Spinner />
          </span>
        ) : null}
        {!isLoading
          ? products.map(product => (
            <div
              // eslint-disable-next-line no-underscore-dangle
              key={product._id}
              className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"
              data-testid="product-card-item"
            >
              <ProductCard width="100%" product={product} />
            </div>
          ))
          : null}
      </div>
    </div>
  );
};

export default Home;
