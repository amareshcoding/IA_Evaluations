import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductData } from '../../store/product/product.actions';
import { cartSet } from './cartSet';
import Product from './Product/Product';

const Products = () => {
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState({});
  useEffect(() => {
    dispatch(getProductData());
  }, []);

  const { data } = useSelector((state) => state.product);

  useEffect(() => {
    setCartData(cartSet(cart));
  }, []);
  let cart = useSelector((state) => state.cart.data);
  console.log("cartData", cartData);
  return (
    <div style={{ display: 'flex', gap: '20px', margin: 'auto' }}>
      {data.map((elem) => {
        return (
          <Product
            key={elem.id}
            id={elem.id}
            name={elem.name}
            description={elem.description}
          ></Product>
        );
      })}
    </div>
  );
};

export default Products;
