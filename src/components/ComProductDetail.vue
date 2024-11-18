<template>
  <div class="product-detail" v-if="product">
    <img :src="product.coverImage" :alt="product.title">
    <h2>{{ product.title }}</h2>
    <p>Nghệ sĩ: {{ product.artist }}</p>
    <p>Giá: ${{ product.price }}</p>
    <p>{{ product.description }}</p>
    <p>Đánh giá: {{ product.rating }}/5</p>
    <p>Còn lại: {{ product.stock }} sản phẩm</p>
    
    <button 
      @click="addToCart(product)"
      :disabled="product.stock === 0"
    >
      {{ product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ' }}
    </button>
  </div>
</template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        product: {}
      };
    },
    computed: {
      ...mapGetters(['products', 'cart'])
    },
    mounted() {
      let id = this.$route.params.id;
      this.product = this.products.find(x => x.id == id);
    },
    methods: {
      ...mapActions(['addToCart']),
      
      // Add product to cart
      addToCart(product) {
        if (product.quality > 0) {
            this.$store.dispatch('addToCart', product); // Gọi Vuex action để thêm sản phẩm vào giỏ hàng
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .menu {
    text-align: center;
    padding: 40px 20px;
    background-color: #fff;
  }
  
  .menu-title {
    font-size: 32px;
    margin-bottom: 20px;
  }
  
  .menu-carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    max-width: 100%;
    animation: slideIn 1s ease-in-out;
  }
  
  .menu-item {
    position: relative;
    flex: 0 0 25%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin: 0 10px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  
  .menu-item img {
    width: 100%;
    transition: transform 0.3s ease;
  }
  
  .menu-item-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    text-align: left;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .menu-item:hover .menu-item-info {
    opacity: 1;
  }
  
  .menu-item:hover img {
    transform: scale(1.1);
  }
  
  .menu-item-info h3 {
    font-size: 18px;
    margin: 0 0 10px;
  }
  
  .menu-item-info p {
    margin: 0;
    color: #ccc;
  }
  </style>
  