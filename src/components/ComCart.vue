<template>
  <div v-if="cart.length === 0">
    <p>Giỏ hàng trống</p>
  </div>

  <div v-else class="modal-content">
    <table style="width: 100%;" class="text-center table">
      <thead>
        <tr>
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
        <tr v-for="item in cart" :key="item.id">
          <td><img :src="item.image" alt="Product Image" style="height: 100px;width: 100px;" /></td>
          <td class="align-middle">{{ item.title }}</td>
          <td class="align-middle">{{ item.price }} VND</td>
          <td class="align-middle">
            <button @click="decreaseQuantity(item)">-</button>
            {{ item.quantity }}
            <button @click="increaseQuantity(item)">+</button>
          </td>
          <td class="align-middle">{{ item.price * item.quantity }} VND</td>
          <td class="align-middle">
            <button class="btn btn-danger" @click="removeFromCart(item)">Xóa</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="3">Tổng cộng</th>
          <th>{{ totalQuantity }}</th>
          <th>{{ totalPrice }} VND</th>
          <th><button class="btn btn-danger" @click="clearCart">Xóa hết</button></th>
        </tr>
      </tfoot>
    </table>

    <div class="checkout-button">
      <button class="btn btn-primary" @click="checkout">Thanh toán</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["cart", "totalPrice", "totalQuantity"]),
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity", "removeFromCart", "clearCart"]),
    
    checkout() {
      if (!this.$store.state.currentUser) {
        alert("Bạn cần đăng nhập để tiếp tục thanh toán.");
        this.$router.push('/login');
      } else {
        alert("Đang chuyển đến trang thanh toán...");
        // Example: this.$router.push('/checkout');
      }
    },
  },
};
</script>

<style scoped>
.modal-content {
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
}

.checkout-button {
  text-align: right;
  margin-top: 15px;
}

.table {
  width: 100%;
  margin: auto;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f2f2f2;
}

.align-middle {
  vertical-align: middle;
}

.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger {
  background-color: #e83e8c;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c72b6d;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
