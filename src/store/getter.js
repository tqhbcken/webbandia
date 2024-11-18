const getters = {
    products: (state) => state.products,
    cart: (state) => state.cart,
    totalPrice: (state) => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    totalQuantity: (state) => state.cart.reduce((total, item) => total + item.quantity, 0),
    categories: (state) => state.categories,
    filteredProducts: (state) => (categoryId) => {
        return state.products.filter(product => product.categoryId === categoryId)
    }
}
  
export default getters;
  