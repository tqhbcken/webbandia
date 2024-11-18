<template>
  <div class="home">
    <div class="hero">
      <h1>Chào mừng đến với Vinyl Store</h1>
      <p>Khám phá bộ sưu tập đĩa than độc đáo của chúng tôi</p>
      <router-link to="/albums" class="cta-button">Xem Bộ Sưu Tập</router-link>
    </div>
    
    <div class="featured-categories">
      <h2>Thể Loại Nổi Bật</h2>
      <div class="category-grid">
        <router-link v-for="category in categories" 
                     :key="category.id" 
                     :to="`/category/${category.id}`"
                     class="category-card">
          <h3>{{ category.name }}</h3>
        </router-link>
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
        { id: 1, name: 'Rock' },
        { id: 2, name: 'Jazz' },
        { id: 3, name: 'Classical' },
        { id: 4, name: 'Pop' }
      ]
    }
  }
}
</script>

<style scoped>
.home {
  padding: 40px 20px;
}

.hero {
  text-align: center;
  padding: 60px 20px;
  background-color: #1a1a1a;
  color: #fff;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.cta-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #e83e8c;
  color: #fff;
  text-decoration: none;
  border-radius: 25px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #c31f6c;
}

.featured-categories {
  max-width: 1200px;
  margin: 0 auto;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.category-card {
  background-color: #f5f5f5;
  padding: 30px;
  text-align: center;
  text-decoration: none;
  color: #333;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
}
</style>
