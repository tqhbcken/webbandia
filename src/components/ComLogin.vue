// Login.vue (component)
<template>
  <div>
    <h2>Đăng nhập</h2>
    <input v-model="username" placeholder="Tên đăng nhập" />
    <input v-model="password" type="password" placeholder="Mật khẩu" />
    <button @click="login">Đăng nhập</button>
    <p v-if="error">{{ error }}</p>
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

