<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <h1>Vinyl Store</h1>
        <p>Nơi âm nhạc trở nên sống động qua từng đường vân đĩa than</p>
        <router-link to="/albums" class="cta-button">Khám Phá Ngay</router-link>
      </div>
    </div>

    <div class="featured-categories">
      <h2>Thể Loại Âm Nhạc</h2>
      <div class="category-grid">
        <router-link v-for="category in categories" 
                     :key="category.id" 
                     :to="`/category/${category.id}`"
                     class="category-card">
          <div class="category-icon">
            <i :class="category.icon"></i>
          </div>
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
        </router-link>
      </div>
    </div>

    <div class="why-vinyl">
      <h2>Tại Sao Chọn Đĩa Than?</h2>
      <div class="features-grid">
        <div class="feature">
          <i class="fas fa-music"></i>
          <h3>Chất Lượng Âm Thanh</h3>
          <p>Trải nghiệm âm nhạc nguyên bản</p>
        </div>
        <div class="feature">
          <i class="fas fa-heart"></i>
          <h3>Giá Trị Sưu Tầm</h3>
          <p>Mỗi đĩa than là một tác phẩm nghệ thuật</p>
        </div>
        <div class="feature">
          <i class="fas fa-history"></i>
          <h3>Hoài Niệm</h3>
          <p>Tái hiện âm nhạc của những thập niên vàng son</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComHome',
  data() {
    return {
      categories: [
        { 
          id: 1, 
          name: 'Rock', 
          icon: 'fas fa-guitar',
          description: 'Từ Classic Rock đến Alternative'
        },
        { 
          id: 2, 
          name: 'Jazz', 
          icon: 'fas fa-saxophone', 
          description: 'Smooth Jazz & Bebop'
        },
        { 
          id: 3, 
          name: 'Classical', 
          icon: 'fas fa-violin',
          description: 'Nhạc cổ điển vượt thời gian'
        },
        { 
          id: 4, 
          name: 'Pop', 
          icon: 'fas fa-microphone',
          description: 'Hits từ mọi thời đại'
        }
      ]
    }
  }
}
</script>

<style scoped>
.home {
  background-color: #f5f5f5;
  color: #333;
}

.hero {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, #6b48ff, #ff4880);
  padding: 0 20px;
}

.hero-content {
  max-width: 800px;
}

.hero h1 {
  font-size: 3.5em;
  margin-bottom: 20px;
  color: #fff;
}

.hero p {
  font-size: 1.2em;
  margin-bottom: 30px;
  color: #fff;
}

.cta-button {
  display: inline-block;
  padding: 12px 30px;
  background-color: #fff;
  color: #6b48ff;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.featured-categories {
  padding: 60px 20px;
  background-color: #fff;
}

.featured-categories h2 {
  text-align: center;
  font-size: 2.2em;
  margin-bottom: 40px;
  color: #333;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
}

.category-card {
  background: #fff;
  padding: 30px 20px;
  text-align: center;
  text-decoration: none;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.category-icon {
  font-size: 2em;
  color: #6b48ff;
  margin-bottom: 15px;
}

.why-vinyl {
  padding: 60px 20px;
  background-color: #f8f9fa;
}

.why-vinyl h2 {
  text-align: center;
  font-size: 2.2em;
  margin-bottom: 40px;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature {
  padding: 25px;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature i {
  font-size: 2em;
  color: #6b48ff;
  margin-bottom: 15px;
}

.feature h3 {
  margin: 10px 0;
  color: #333;
}

.feature p {
  color: #666;
}
</style>
