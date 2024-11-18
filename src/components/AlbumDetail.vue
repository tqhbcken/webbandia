<template>
  <div class="product-detail" v-if="product">
    <img :src="product.image" :alt="product.title" class="product-image" />
    <h2>{{ product.title }}</h2>
    <p>Nghệ sĩ: {{ product.artist }}</p>
    <p>Giá: {{ product.price }} VND</p>
    <p>{{ product.description }}</p>
    <p>Đánh giá: {{ product.rating }}/5</p>
    <p>Còn lại: {{ product.stock }} sản phẩm</p>

    <button
      @click="addToCart(product)"
      :disabled="product.stock === 0"
      class="add-to-cart-btn"
    >
      {{ product.stock === 0 ? "Hết hàng" : "Thêm vào giỏ" }}
    </button>
  </div>
</template>

<script>
import axios from "axios";
import APIURL from "@/store/constraint";

export default {
  name: "AlbumDetail",
  data() {
    return {
      product: null, // Dữ liệu chi tiết album
    };
  },
  async created() {
    try {
      const id = this.$route.params.id;
      const response = await axios.get(`${APIURL}/products/${id}`);
      this.product = response.data; // Lấy thông tin chi tiết sản phẩm
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
  },
  methods: {
    addToCart(product) {
      if (product.stock > 0) {
        this.$store.dispatch("addToCart", product); // Dispatch action to add product to cart
        console.log("Added to cart:", product); // Log for verification
      }
    },
  },
};
</script>

<style scoped>
.product-detail {
  padding: 20px;
  text-align: center;
}

.product-image {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  margin: 5px 0;
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
