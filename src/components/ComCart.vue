<template>
  <div v-if="!cart || cart.length === 0">
    <p>Giỏ hàng trống</p>
  </div>

  <div v-else class="modal-content">
    <table style="width: 100%" class="text-center table">
      <thead>
        <tr>
          <th>
            <input 
              type="checkbox"
              v-model="selectAll"
              @change="toggleSelectAll"
            />
          </th>
          <th>HÌNH</th>
          <th>SẢN PHẨM</th>
          <th>Đơn giá</th>
          <th>Số lượng</th>
          <th>Tiền</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through cart using v-for -->
        <tr v-for="item in validCartItems" :key="item.id">
          <td class="align-middle">
            <input 
              type="checkbox"
              v-model="selectedItems"
              :value="item.id"
            />
          </td>
          <td>
            <img
              :src="getImageUrl(item.coverImage)"
              :alt="item.title"
              style="height: 100px; width: 100px"
              @error="handleImageError($event, item)"
            />
          </td>
          <td class="align-middle">{{ item.title }}</td>
          <td class="align-middle price-animation">{{ item.price }} VND</td>
          <td class="align-middle">
            <button @click="handleDecreaseQuantity(item)">-</button>
            {{ item.quantity }}
            <button @click="handleIncreaseQuantity(item)">+</button>
          </td>
          <td class="align-middle price-animation">{{ item.price * item.quantity }} VND</td>
          <td class="align-middle">
            <button class="btn btn-danger" @click="handleRemoveFromCart(item)">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="4">Tổng cộng</th>
          <th>{{ selectedQuantity }}</th>
          <th class="price-animation">{{ selectedTotalPrice }} VND</th>
          <th>
            <button class="btn btn-danger" @click="handleClearCart">Xóa hết</button>
          </th>
        </tr>
      </tfoot>
    </table>

    <div class="checkout-button">
      <button 
        class="btn btn-primary" 
        @click="handleCheckout"
        :disabled="selectedItems.length === 0"
      >
        Thanh toán ({{ selectedItems.length }} sản phẩm)
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      selectedItems: [],
      selectAll: false
    }
  },
  computed: {
    ...mapGetters(["cart", "totalPrice", "totalQuantity"]),
    validCartItems() {
      return this.cart.filter(item => item && item.id && item.quantity > 0);
    },
    selectedQuantity() {
      return this.validCartItems
        .filter(item => this.selectedItems.includes(item.id))
        .reduce((total, item) => total + item.quantity, 0);
    },
    selectedTotalPrice() {
      return this.validCartItems
        .filter(item => this.selectedItems.includes(item.id))
        .reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  },
  methods: {
    ...mapActions([
      "increaseQuantity",
      "decreaseQuantity", 
      "removeFromCart",
      "clearCart",
    ]),

    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedItems = this.validCartItems.map(item => item.id);
      } else {
        this.selectedItems = [];
      }
    },

    getImageUrl(imageName) {
      if (!imageName) {
        return require('@/assets/record_menu/tylor_the_creator.png');
      }
      try {
        return require(`@/assets/record_menu/${imageName}`);
      } catch (error) {
        console.error("Không thể tải hình ảnh:", error);
        return require('@/assets/record_menu/tylor_the_creator.png');
      }
    },

    handleImageError(event, item) {
      console.error(`Lỗi tải hình ảnh cho sản phẩm ${item.title}`);
      event.target.src = require('@/assets/record_menu/tylor_the_creator.png');
    },

    handleIncreaseQuantity(item) {
      if (item && item.id) {
        this.increaseQuantity(item);
      }
    },

    handleDecreaseQuantity(item) {
      if (item && item.id) {
        if (item.quantity === 1) {
          // Nếu số lượng là 1 và giảm nữa thì xóa sản phẩm
          this.handleRemoveFromCart(item);
        } else {
          this.decreaseQuantity(item);
        }
      }
    },

    handleRemoveFromCart(item) {
      if (item && item.id) {
        if (confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
          this.removeFromCart(item);
          this.selectedItems = this.selectedItems.filter(id => id !== item.id);
        }
      }
    },

    handleClearCart() {
      if (this.cart.length > 0) {
        if (confirm('Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
          this.clearCart();
          this.selectedItems = [];
          this.selectAll = false;
        }
      }
    },

    handleCheckout() {
      if (this.selectedItems.length === 0) {
        alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán");
        return;
      }

      if (!this.$store.state.currentUser) {
        alert("Bạn cần đăng nhập để tiếp tục thanh toán.");
        this.$router.push("/login");
      } else {
        // Kiểm tra số lượng vượt quá tồn kho cho các sản phẩm được chọn
        const selectedProducts = this.validCartItems.filter(item => 
          this.selectedItems.includes(item.id)
        );
        const invalidItems = selectedProducts.filter(item => 
          item.quantity > item.stock
        );
        
        if (invalidItems.length > 0) {
          const messages = invalidItems.map(item => 
            `${item.title}: Số lượng (${item.quantity}) vượt quá tồn kho (${item.stock})`
          );
          alert("Vui lòng điều chỉnh lại số lượng cho các sản phẩm sau:\n" + messages.join("\n"));
          return;
        }
        this.$router.push('/checkout');
      }
    },
  },
  watch: {
    validCartItems: {
      handler(newItems) {
        // Cập nhật selectedItems khi có sản phẩm bị xóa
        this.selectedItems = this.selectedItems.filter(id => 
          newItems.some(item => item.id === id)
        );
        // Cập nhật selectAll
        this.selectAll = this.selectedItems.length === newItems.length;
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.modal-content {
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.checkout-button {
  text-align: right;
  margin-top: 15px;
}

.table {
  width: 100%;
  margin: auto;
  border-collapse: collapse;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.table th,
.table td {
  padding: 15px;
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
}

.table th {
  background-color: #f8f9fa;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9em;
}

.table tr:hover td {
  background-color: #f5f5f5;
}

.align-middle {
  vertical-align: middle;
}

.btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-danger {
  background-color: #e83e8c;
  color: #fff;
  transform: scale(1);
}

.btn-danger:hover:not(:disabled) {
  background-color: #c72b6d;
  transform: scale(1.05);
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  transform: scale(1);
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
  transform: scale(1.05);
}

.price-animation {
  animation: priceChange 0.5s ease;
  position: relative;
}

@keyframes priceChange {
  0% {
    transform: translateY(-5px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

td button {
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: white;
  transition: all 0.2s ease;
}

td button:hover {
  background: #f0f0f0;
  transform: scale(1.1);
}

img {
  transition: transform 0.3s ease;
  border-radius: 8px;
}

img:hover {
  transform: scale(1.1);
}
</style>
