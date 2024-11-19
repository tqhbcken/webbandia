<template>
  <div v-if="!currentUser">
    <p>Vui lòng đăng nhập để tiếp tục thanh toán.</p>
    <router-link to="/login" class="btn btn-primary">Đăng nhập</router-link>
  </div>

  <div v-else-if="cart.length === 0">
    <p>Giỏ hàng của bạn đang trống.</p>
    <router-link to="/albums" class="btn btn-primary">Tiếp tục mua sắm</router-link>
  </div>

  <div v-else>
    <h2>Thông tin đơn hàng</h2>
    <table>
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Số lượng</th>
          <th>Đơn giá</th>
          <th>Tổng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ formatPrice(item.price) }} VND</td>
          <td>{{ formatPrice(item.price * item.quantity) }} VND</td>
        </tr>
      </tbody>
    </table>

    <h3>Tổng cộng: {{ formatPrice(totalPrice) }} VND</h3>

    <!-- Form nhập thông tin thanh toán -->
    <form @submit.prevent="validateAndSubmit">
      <div>
        <label for="address">Địa chỉ:</label>
        <input 
          type="text" 
          id="address"
          v-model.trim="orderData.address" 
          required
          :class="{ 'error': validationErrors.address }"
        />
        <span v-if="validationErrors.address" class="error-message">
          {{ validationErrors.address }}
        </span>
      </div>

      <div>
        <label for="phone">Số điện thoại:</label>
        <input 
          type="tel"
          id="phone" 
          v-model.trim="orderData.phone"
          required
          :class="{ 'error': validationErrors.phone }"
        />
        <span v-if="validationErrors.phone" class="error-message">
          {{ validationErrors.phone }}
        </span>
      </div>

      <div>
        <label for="paymentMethod">Phương thức thanh toán:</label>
        <select 
          id="paymentMethod"
          v-model="orderData.paymentMethod" 
          required
        >
          <option value="cash">Tiền mặt</option>
          <option value="credit">Thẻ tín dụng</option>
          <option value="banking">Chuyển khoản ngân hàng</option>
        </select>
      </div>

      <button 
        type="submit"
        :disabled="isSubmitting || !isFormValid"
      >
        {{ isSubmitting ? 'Đang xử lý...' : 'Đặt hàng' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'CheckoutForm',
  computed: {
    ...mapGetters(["cart", "totalPrice"]),
    currentUser() {
      return this.$store.state.currentUser;
    },
    isFormValid() {
      return this.orderData.address.trim() !== '' && 
             this.orderData.phone.trim() !== '' &&
             /^[0-9]{10}$/.test(this.orderData.phone) &&
             this.orderData.paymentMethod !== '';
    }
  },
  data() {
    return {
      orderData: {
        address: "",
        phone: "",
        paymentMethod: "cash",
      },
      validationErrors: {
        address: '',
        phone: ''
      },
      isSubmitting: false
    };
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN').format(price);
    },

    validateForm() {
      let isValid = true;
      this.validationErrors = {
        address: '',
        phone: ''
      };

      // Kiểm tra địa chỉ
      if (!this.orderData.address.trim()) {
        this.validationErrors.address = 'Vui lòng nhập địa chỉ';
        isValid = false;
      } else if (this.orderData.address.length < 10) {
        this.validationErrors.address = 'Địa chỉ phải có ít nhất 10 ký tự';
        isValid = false;
      }

      // Kiểm tra số điện thoại
      if (!this.orderData.phone) {
        this.validationErrors.phone = 'Vui lòng nhập số điện thoại';
        isValid = false;
      } else if (!/^[0-9]{10}$/.test(this.orderData.phone)) {
        this.validationErrors.phone = 'Số điện thoại phải có 10 chữ số';
        isValid = false;
      } else if (!/^(0[3|5|7|8|9])/.test(this.orderData.phone)) {
        this.validationErrors.phone = 'Số điện thoại không hợp lệ';
        isValid = false;
      }

      return isValid;
    },

    async validateAndSubmit() {
      if (!this.validateForm()) {
        return;
      }

      if (!this.currentUser) {
        alert('Vui lòng đăng nhập để tiếp tục');
        this.$router.push('/login');
        return;
      }

      if (this.cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống');
        return;
      }

      this.isSubmitting = true;

      try {
        const order = {
          userId: this.currentUser.id,
          products: this.cart.map(item => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            price: item.price
          })),
          totalPrice: this.totalPrice,
          address: this.orderData.address.trim(),
          phone: this.orderData.phone.trim(),
          paymentMethod: this.orderData.paymentMethod,
          status: "pending",
          orderDate: new Date().toISOString(),
        };
        
        const createdOrder = await this.$store.dispatch("createOrder", order);
        
        if (createdOrder) {
          await this.$store.dispatch('clearCart');
          this.$router.push({
            name: "OrderSuccess",
            params: { orderId: createdOrder.id }
          });
        }
      } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        alert("Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại sau."+ error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
.error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.8em;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 50%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>