import React, { useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AlienResult } from '~/store/config/alienStore/useAlien';
import { State } from '~/store/State';

import Spinner from '~/components/base/Spinner';
import ProductCard from '~/components/common/ProductCard';

import { ProductsStateType } from '~/store/modules/products/types';

import './Home.scss';

type PropsType = {
  modules: Array<AlienResult<State>>;
};

const Home = ({ modules }: PropsType): ReactElement => {
  const dispatch = useDispatch();
  const [productsModule] = modules;

  const { actions, selectors } = productsModule;

  const { isLoading, products, error } = useSelector<State, ProductsStateType>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    selectors!.getProducts,
  );

  useEffect(() => {
    dispatch(actions.fetchProducts(`/products`));
  }, [dispatch, actions]);

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
