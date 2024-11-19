<template>
  <div class="search-results">
    <h2>Kết quả tìm kiếm cho "{{ searchQuery }}"</h2>

    <div class="filters">
      <div class="filter-group">
        <label>Lọc theo giá:</label>
        <select v-model="priceFilter">
          <option value="">Tất cả</option>
          <option value="0-500000">Dưới 500.000đ</option>
          <option value="500000-1000000">500.000đ - 1.000.000đ</option>
          <option value="1000000+">Trên 1.000.000đ</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Thể loại:</label>
        <select v-model="genreFilter">
          <option value="">Tất cả</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="jazz">Jazz</option>
          <option value="hiphop">Hip Hop</option>
          <option value="classical">Classical</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Đánh giá:</label>
        <select v-model="ratingFilter">
          <option value="">Tất cả</option>
          <option value="4">4 sao trở lên</option>
          <option value="3">3 sao trở lên</option>
          <option value="2">2 sao trở lên</option>
        </select>
      </div>
    </div>
    
    <div v-if="loading" class="loading">
      <div class="spinner"></div> 
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="filteredResults.length === 0" class="no-results">
      Không tìm thấy kết quả nào
    </div>

    <div v-else class="results-grid">
      <div v-for="product in filteredResults" :key="product.id" class="product-card">
        <img :src="require(`@/assets/record_menu/${product.coverImage}`)" :alt="product.title">
        <h3>{{ product.title }}</h3>
        <p class="artist">{{ product.artist }}</p>
        <p class="genre">{{ product.genre }}</p>
        <p class="price">{{ formatPrice(product.price) }} VND</p>
        <p class="rating">Đánh giá: {{ product.rating }}/5</p>
        <router-link :to="`/albums/${product.id}`" class="view-details">
          Xem chi tiết
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import APIURL from '@/store/constraint'

export default {
  name: 'SearchList',
  data() {
    return {
      searchQuery: this.$route.query.q || '',
      results: [],
      loading: true,
      error: null,
      priceFilter: '',
      genreFilter: '',
      ratingFilter: ''
    }
  },
  computed: {
    filteredResults() {
      return this.results.filter(product => {
        let matchesPrice = true
        let matchesGenre = true
        let matchesRating = true

        // Lọc theo giá
        if (this.priceFilter) {
          const [min, max] = this.priceFilter.split('-').map(Number)
          if (max) {
            matchesPrice = product.price >= min && product.price <= max
          } else {
            matchesPrice = product.price >= min
          }
        }

        // Lọc theo thể loại
        if (this.genreFilter) {
          matchesGenre = product.genre === this.genreFilter
        }

        // Lọc theo đánh giá
        if (this.ratingFilter) {
          matchesRating = product.rating >= Number(this.ratingFilter)
        }

        return matchesPrice && matchesGenre && matchesRating
      })
    }
  },
  created() {
    this.searchProducts()
  },
  methods: {
    async searchProducts() {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get(`${APIURL}/products?q=${this.searchQuery}`)
        this.results = response.data
      } catch (err) {
        this.error = 'Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại sau.'
        console.error('Lỗi tìm kiếm:', err)
      } finally {
        this.loading = false
      }
    },
    formatPrice(price) {
      return price.toLocaleString('en-US')
    }
  },
  watch: {
    '$route.query.q': {
      handler(newQuery) {
        this.searchQuery = newQuery
        this.searchProducts()
      }
    }
  }
}
</script>

<style scoped>
.search-results {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.filter-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-group label {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.filter-group select {
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 14px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.filter-group select:hover {
  border-color: #e83e8c;
}

.filter-group select:focus {
  outline: none;
  border-color: #e83e8c;
  box-shadow: 0 0 0 2px rgba(232, 62, 140, 0.1);
}

.loading, .error, .no-results {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
}

.error {
  color: red;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.product-card h3 {
  margin: 10px 0;
  font-size: 1.2em;
}

.artist {
  color: #666;
  margin: 5px 0;
}

.genre {
  color: #888;
  margin: 5px 0;
  font-style: italic;
}

.price {
  font-weight: bold;
  color: #e83e8c;
  margin: 10px 0;
}

.rating {
  color: #f8b739;
  margin: 5px 0;
}

.view-details {
  display: inline-block;
  padding: 8px 15px;
  background-color: #e83e8c;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  transition: background-color 0.3s;
}

.view-details:hover {
  background-color: #d63384;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #e83e8c;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>