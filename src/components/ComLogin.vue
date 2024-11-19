// Login.vue (component)
<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-form">
        <h2>Đăng Nhập</h2>
        <div class="social-links">

        </div>
        <div class="form-group">
          <label>TÊN ĐĂNG NHẬP</label>
          <input 
            v-model="username" 
            type="text"
            placeholder="Nhập tên đăng nhập"
          />
        </div>
        <div class="form-group">
          <label>MẬT KHẨU</label>
          <input 
            v-model="password" 
            type="password"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div class="form-options">
          <a href="#" class="forgot-password">Quên mật khẩu?</a>
        </div>
        <button @click="login" class="login-btn">Đăng nhập</button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
      <div class="welcome-side">
        <h2>Chào mừng đến với Vinyl Store</h2>
        <p>Chưa có tài khoản?</p>
        <router-link to="/register" class="signup-btn">Đăng ký</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import eventBus from '@/eventBus';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    ...mapActions(['loginUser']),
    async login() {
      try {
        const user = await this.loginUser({
          username: this.username,
          password: this.password,
        });
        
        if (user) {
          // Store the user data in localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          
          // Emit login success event
          eventBus.emit('loginSuccess', user);
          
          // Redirect to the home page
          this.$router.push('/');
        }
      } catch (error) {
        this.error = 'Đăng nhập không thành công';
        console.error("Lỗi đăng nhập:", error);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
}

.login-box {
  display: flex;
  width: 900px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

.login-form {
  flex: 1;
  padding: 40px;
}

.welcome-side {
  flex: 1;
  background-color: #e83e8c;
  color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h2 {
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
}

.welcome-side h2 {
  color: white;
}

.social-links {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  text-decoration: none;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.form-options {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
}

.forgot-password {
  color: #e83e8c;
  text-decoration: none;
  font-size: 14px;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #e83e8c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #c31f6b;
}

.signup-btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: transparent;
  border: 2px solid white;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
  transition: all 0.3s;
}

.signup-btn:hover {
  background-color: white;
  color: #e83e8c;
}

.error-message {
  color: #dc3545;
  margin-top: 10px;
  text-align: center;
}

@media (max-width: 768px) {
  .login-box {
    flex-direction: column;
    width: 100%;
    max-width: 400px;
  }
  
  .welcome-side {
    padding: 30px;
  }
}
</style>
