<template>
  <header>
    <div class="container">
      <div class="logo">
        <img src="@/assets/logo/logo2.png" alt="Vinyl Store Logo" />
      </div>
      <div class="search-box">
        <input
          type="text" 
          v-model="searchQuery"
          placeholder="Tìm kiếm sản phẩm..."
          @keyup.enter="search"
        />
        <button @click="search">
          <i class="fas fa-search"></i>
          <span>Tìm kiếm</span>
        </button>
      </div>
      <nav>
        <ul>
          <li><router-link to="/" exact>Trang Chủ</router-link></li>
          <li>
            <router-link to="/albums">Albums</router-link>
            <div class="dropdown-content">
              <router-link to="/category/1">Rock</router-link>
              <router-link to="/category/2">Jazz</router-link>
              <router-link to="/category/3">Classical</router-link>
              <router-link to="/category/4">Pop</router-link>
            </div>
          </li>
          <li><router-link to="/artists">Nghệ Sĩ</router-link></li>
          <li><router-link to="/gioithieu">Giới Thiệu</router-link></li>
          <li><router-link to="/lienhe">Liên Hệ</router-link></li>
        </ul>
      </nav>
      <div class="user-actions">
        <div v-if="user" class="user-info">
          <span>Xin chào, {{ user.username }}</span>
          <button @click="logout" class="logout-btn">Đăng Xuất</button>
        </div>
        <div v-else class="auth-buttons">
          <router-link to="/login" class="auth-btn">Đăng Nhập</router-link>
          <router-link to="/register" class="auth-btn">Đăng Ký</router-link>
        </div>
        <router-link to="/cart" class="cart-btn">
          <i class="fas fa-shopping-cart"></i>
          Giỏ hàng
        </router-link>
      </div>
    </div>
  </header>
  <router-view />
</template>

<script>
import eventBus from "@/eventBus";

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("currentUser")) || null,
      searchQuery: "",
    };
  },
  created() {
    eventBus.on("loginSuccess", (user) => {
      this.user = user;
    });
  },
  beforeUnmount() {
    eventBus.off("loginSuccess");
  },
  methods: {
    logout() {
      localStorage.removeItem("currentUser");
      this.user = null;
    },
    search() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          name: 'SearchList',
          query: { q: this.searchQuery.trim() }
        });
        this.searchQuery = '';
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #1a1a1a;
  color: #fff;
}

.search-box {
  display: flex;
  align-items: center;
  margin: 0 20px;
}

.search-box input {
  padding: 8px 15px;
  border-radius: 20px 0 0 20px;
  border: none;
  width: 300px;
  font-size: 14px;
}

.search-box button {
  padding: 8px 15px;
  border-radius: 0 20px 20px 0;
  border: none;
  background-color: #e83e8c;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.search-box button:hover {
  background-color: #d63384;
}

.logo img {
  height: 50px;
}

nav ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

nav ul li {
  position: relative;
  margin: 0 15px;
}

nav ul li a {
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #e83e8c;
}

nav ul li a.router-link-active {
  color: #e83e8c;
  font-weight: bold;
  position: relative;
}

nav ul li a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #e83e8c;
}

nav ul li a.router-link-exact-active {
  color: #e83e8c;
  font-weight: bold;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #1a1a1a;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

nav ul li:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  color: #fff;
  padding: 12px 16px;
  display: block;
}

.dropdown-content a.router-link-active {
  background-color: #333;
  color: #e83e8c;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.auth-btn,
.cart-btn,
.logout-btn {
  padding: 8px 15px;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.auth-btn {
  color: #fff;
  border: 1px solid #e83e8c;
}

.cart-btn {
  background-color: #e83e8c;
  color: #fff;
}

.cart-btn.router-link-active {
  background-color: #fff;
  color: #e83e8c;
}

.logout-btn {
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
}

.auth-btn:hover,
.cart-btn:hover,
.logout-btn:hover {
  background-color: #fff;
  color: #1a1a1a;
}

.auth-btn.router-link-active {
  background-color: #e83e8c;
  color: #fff;
  border-color: #e83e8c;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
