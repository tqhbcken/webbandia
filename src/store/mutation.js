const mutations = {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    REGISTER_USER(state, user) {
      state.users.push(user);
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
    },
    LOGOUT(state) {
      state.currentUser = null;
      localStorage.removeItem('currentUser'); // Xóa thông tin người dùng khỏi localStorage
    },
    
    ADD_ITEM_TO_CART(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({...product, quantity: 1}); 
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    REMOVE_FROM_CART(state, product) {
      state.cart = state.cart.filter(item => item.id !== product.id);
      localStorage.setItem('cart', JSON.stringify(state.cart)); 
    },
    INCREASE_QUANTITY(state, product) {
      const cartItem = state.cart.find(item => item.id === product.id);
      if (cartItem) {
        cartItem.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(state.cart)); // Lưu lại giỏ hàng sau khi tăng số lượng
      }
    },
    DECREASE_QUANTITY(state, product) {
      const cartItem = state.cart.find(item => item.id === product.id);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    CLEAR_CART(state) {
      state.cart = [];
      localStorage.removeItem('cart');
    },
    
  };
  
  export default mutations;