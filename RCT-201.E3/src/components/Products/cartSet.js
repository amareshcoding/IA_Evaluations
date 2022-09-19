export const cartSet = (cart) => {
  const map = {};
  cart.forEach((e) => {
    map[e.productId] = e.count;
  });
  return map;
};
