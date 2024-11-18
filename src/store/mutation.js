const mutations = {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    REGISTER_USER(state, user) {
      state.users.push(user);
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
    ADD_TO_CART(state, product) {
        // Tìm sản phẩm trong state.products và giảm quality
        const productInStock = state.products.find((item) => item.id === product.id);
        
        if (productInStock && productInStock.quality > 0) {
          const existingProductInCart = state.cart.find((item) => item.id === product.id);
          
          // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng trong giỏ hàng
          if (existingProductInCart) {
            existingProductInCart.quantity++;
          } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm nó vào giỏ hàng với quantity ban đầu là 1
            const newProduct = { ...product, quantity: 1 };
            state.cart.push(newProduct);
          }
          
          // Giảm số lượng sản phẩm trong kho
          productInStock.quality--;
        } else {
          console.warn("Sản phẩm đã hết hàng hoặc không đủ số lượng");
        }
      },
    REMOVE_FROM_CART(state, product) {
      state.cart = state.cart.filter((item) => item.id !== product.id);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    INCREASE_QUANTITY(state, product) {
        // Find the product in the stock
        const productInStock = state.products.find((item) => item.id === product.id);
      
        // Check if the product exists and has available quantity in stock
        if (productInStock && productInStock.quality > 0) {
          const existingProductInCart = state.cart.find((item) => item.id === product.id);
          
          // Increase cart quantity if there is stock available
          if (existingProductInCart) {
            existingProductInCart.quantity++;
            productInStock.quality--; // Reduce stock after adding to cart
          }
        } else {
          console.warn("Sản phẩm đã hết hàng hoặc không đủ số lượng");
        }
      },
    DECREASE_QUANTITY(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity--;
      } else {
        state.cart = state.cart.filter((item) => item.id !== product.id);
      }
    },
    
  };
  
  export default mutations;
  