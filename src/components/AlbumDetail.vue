<template>
  <div class="product-detail" v-if="product">
    <div class="product-container">
      <div class="product-image-container">
        <img :src="require(`@/assets/record_menu/${product.coverImage}`)" :alt="product.title" class="product-image" />
      </div>
      <div class="product-info">
        <h2>{{ product.title }}</h2>
        <p>Nghệ sĩ: {{ product.artist }}</p>
        <p>Giá: {{ product.price }} VND</p>
        <p>{{ product.description }}</p>
        <p>Đánh giá: {{ product.rating }}/5</p>
        <p>Còn lại: {{ product.stock }} sản phẩm</p>

        <div class="quantity-selector">
          <button @click="decreaseQuantity">-</button>
          <input type="number" v-model.number="quantity" min="1" />
          <button @click="increaseQuantity">+</button>
        </div>

        <button
          @click="addToCart(product)"
          :disabled="product.stock === 0"
          class="add-to-cart-btn"
        >
          {{ product.stock === 0 ? "Hết hàng" : `Thêm ${quantity} sản phẩm vào giỏ` }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import APIURL from "@/store/constraint";
import { mapMutations } from "vuex";

export default {
  name: "AlbumDetail",
  data() {
    return {
      product: null,
      quantity: 1
    };
  },
  async created() {
    try {
      const id = this.$route.params.id;
      const response = await axios.get(`${APIURL}/products/${id}`);
      this.product = response.data;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
  },
  methods: {
    ...mapMutations(["ADD_ITEM_TO_CART"]),
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart(product) {
      if (product.stock === 0) {
        alert("Sản phẩm đã hết hàng!");
        return;
      }

      const cartItems = this.$store.state.cart;
      const existingItem = cartItems.find(item => item.id === product.id);
      const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
      
      if (this.quantity < 1) {
        alert("Số lượng sản phẩm không hợp lệ!");
        this.quantity = 1;
        return;
      }

      if (currentQuantityInCart + this.quantity > product.stock) {
        alert("Số lượng sản phẩm vượt quá số lượng trong kho!");
        return;
      }

      this.ADD_ITEM_TO_CART({
        ...product,
        quantity: this.quantity,
      });
      alert(`Đã thêm ${this.quantity} sản phẩm vào giỏ hàng!`);
      this.quantity = 1;
    },
  },
};
</script>

<style scoped>
.product-detail {
  padding: 20px;
}

.product-container {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-image-container {
  flex: 0 0 400px;
}

.product-info {
  flex: 1;
  text-align: left;
}

.product-image {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  margin: 5px 0;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
}

.quantity-selector button {
  padding: 5px 15px;
  background-color: #e83e8c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.quantity-selector button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.quantity-selector input {
  width: 60px;
  padding: 5px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.add-to-cart-btn {
  padding: 10px 20px;
  background-color: #e83e8c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.add-to-cart-btn:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
</style>
