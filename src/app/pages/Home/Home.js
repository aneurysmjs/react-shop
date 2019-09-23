// @flow strict
import React, { useEffect } from 'react';
// $FlowFixMe
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '@/components/base/Spinner/Spinner';
import { fetchProducts } from '@/store/modules/products/actions';
import { getProducts } from '@/store/modules/products/selectors';
import type { ProductsType } from '@/store/types/ProductsType';

import { ProductCard } from '@/components/common/ProductCard';

import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, payload, error }: ProductsType = useSelector(getProducts);

  useEffect(() => {
    dispatch(fetchProducts(`/products`));
  }, [dispatch]);

  return (
    <div className="home">
      <h2 className="home__title">Shop</h2>
      <div className="row">
        { error ? (<span className="home__loader">{ error.message }</span>) : null}
        { isLoading ? (<span className="home__loader"><Spinner /></span>) : null}
        { !isLoading ? payload.map((product) => (
          <div
            // eslint-disable-next-line no-underscore-dangle
            key={product._id}
            className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"
            data-testid="product-card-item"
          >
            <ProductCard
              width="100%"
              product={product}
            />
          </div>)) : null }
      </div>
    </div>
  );
};

export default Home;
