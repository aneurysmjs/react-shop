import React, { FunctionComponent } from 'react';

import './Home.scss';

const Home: FunctionComponent = () => {
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
          ? products.map((product) => (
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
