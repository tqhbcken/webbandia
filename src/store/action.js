import axios from "axios"
import APIURL from "./constraint"
const actions={

    async fetchDataProduct({commit})
    {
        try {
           const response=await axios.get(`${APIURL}/products`) 
           commit('SET_PRODUCTS',response.data)
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu sản phẩm:", error)
        }
    },
    async registerUser({ commit }, userData) {
      try {
        // Fetch all users from the API to check if the username already exists
        const response = await axios.get(`${APIURL}/users`);
        const userExists = response.data.some(user => user.username === userData.username);
    
        if (userExists) {
          throw new Error('Tên đăng nhập đã tồn tại'); // Username already exists
        }
    
        // If username is unique, proceed with the registration
        const registerResponse = await axios.post(`${APIURL}/users`, userData);
        commit('REGISTER_USER', registerResponse.data);
        return registerResponse.data; // Return the user data to confirm successful registration
      } catch (error) {
        console.error("Lỗi khi đăng ký người dùng", error);
        throw error; // Propagate error for the component to handle
      }
    },
    async loginUser({ commit }, { username, password }) {
      try {
        // Fetch all users from the API
        const response = await axios.get(`${APIURL}/users`);
        const user = response.data.find(user => user.username === username && user.password === password);
        
        if (user) {
          commit('SET_CURRENT_USER', user); // Store the user data in Vuex state
          return user; // Return the user data to the component
        } else {
          throw new Error('Thông tin đăng nhập không đúng');
        }
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        throw error; // Propagate the error for the component to handle
      }
    },
    // action.js
async addToCart({ commit, state }, product) {
  try {
    // Kiểm tra người dùng đã đăng nhập
    if (state.currentUser) {
      const response = await axios.post(`${APIURL}/cart`, {
        userId: state.currentUser.id,
        productId: product.id,
        quantity: 1,
      });
      commit("ADD_TO_CART", product);
      console.log("Đã thêm vào giỏ hàng và lưu trên API:", response.data);
    } else {
      // Nếu chưa đăng nhập, thêm vào giỏ hàng chỉ trong store
      commit("ADD_TO_CART", product);
      console.log("Đã thêm vào giỏ hàng chỉ trong store.");
    }
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
  }
},

      removeFromCart({ commit }, product) {
        commit("REMOVE_FROM_CART", product);
      },
      clearCart({ commit }) {
        commit("CLEAR_CART");
      },
      increaseQuantity({ commit }, product) {
        commit("INCREASE_QUANTITY", product);
      },
      decreaseQuantity({ commit }, product) {
        commit("DECREASE_QUANTITY", product);
      },
    async fetchCategories({commit}) {
        try {
            const response = await axios.get(`${APIURL}/categories`)
            commit('SET_CATEGORIES', response.data)
        } catch (error) {
            console.error("Lỗi khi lấy danh mục:", error)
        }
    },
    async createOrder({commit, state}, orderData) {
        try {
            const response = await axios.post(`${APIURL}/orders`, {
                ...orderData,
                userId: state.currentUser?.id,
                orderDate: new Date().toISOString(),
                status: 'pending'
            })
            commit('CLEAR_CART')
            return response.data
        } catch (error) {
            console.error("Lỗi khi tạo đơn hàng:", error)
            throw error
        }
    }
}

export default actions