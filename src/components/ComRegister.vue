<template>
  <div class="register-form">
    <h2>Đăng ký tài khoản</h2>
    <input v-model="username" placeholder="Tên đăng nhập" />
    <input v-model="password" type="password" placeholder="Mật khẩu" />
    <input
      v-model="confirmPassword"
      type="password"
      placeholder="Xác nhận mật khẩu"
    />
    <button @click="register">Đăng ký</button>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      error: "",
      success: "",
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
    async register() {
      if (this.password !== this.confirmPassword) {
        this.error = "Mật khẩu không khớp";
        return;
      }

      try {
        // Gửi yêu cầu đăng ký qua API
        await this.registerUser({
          username: this.username,
          password: this.password,
        });

        // Đăng ký thành công
        this.success = "Đăng ký thành công!";
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
        this.error = "";

        // Chuyển hướng đến trang đăng nhập
        this.$router.push("/login");
      } catch (error) {
        // Xử lý lỗi khi đăng ký không thành công
        this.error = "Tên đăng nhập đã tồn tại hoặc có lỗi xảy ra";
      }
    },
  },
};
</script>

<style>
.register-form input {
  display: block;
  width: 20%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  margin: 0 auto;
}

.register-form button {
  width: 10%;
  padding: 12px;
  background-color: #e83e8c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.error {
  color: red;
}
.success {
  color: green;
}
</style>
