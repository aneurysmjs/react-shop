/* eslint-disable prettier/prettier */
import React, { useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAlien } from '~/store/config/alienStore';

// import Spinner from '~/components/base/Spinner';
// import ProductCard from '~/components/common/ProductCard';
// 
// import { fetchProducts } from '~/store/modules/products/actions';
// import { getProducts } from '~/store/modules/products/selectors';
// 
// import { ProductsStateType } from '~/store/modules/products/types';

import './Home.scss';

const Home = (): ReactElement => {
  const dispatch = useDispatch();
  // const { isLoading, products, error }: ProductsStateType = useSelector(getProducts);

  // useEffect(() => {
  //   dispatch(fetchProducts(`/products`));
  // }, [dispatch]);
  const result = useAlien({
    getModule: () => import('~/store/modules/products'),
  });

  // const selector = result ? result.selectors.getProducts : (): {} => ({});
  
  // const { isLoading, products, error } = useSelector(selector);
  
  useEffect(() => {
    if (result) {
      dispatch(result.actions.fetchProducts(`/products`));
    }
  }, [dispatch, result]);
  
  console.log('result', result);

  return (
    <div className="home">
      <h2 className="home__title">Shop</h2>
      <div className="row">
        {/* {error ? <span className="home__loader">{error.message}</span> : null}
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
          : null} */}
      </div>
    </div>
  );
};

export default Home;
