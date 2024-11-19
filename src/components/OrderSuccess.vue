<!-- OrderSuccess.vue -->
<template>
    <div>
      <h2>Đơn hàng của bạn đã được đặt thành công!</h2>
      <p>Cảm ơn bạn đã mua sắm cùng chúng tôi.</p>
      <p>Mã đơn hàng của bạn là: {{ orderId }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "OrderSuccess",
    computed: {
      orderId() {
        return this.$route.params.orderId;
      }
    }
  };
  </script>
  