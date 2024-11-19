<template>
    <div class="artists">
      <h1>Danh Sách Nghệ Sĩ</h1>
      <div v-if="artists.length > 0" class="artist-list">
        <div v-for="artist in artists" :key="artist.id" class="artist-card">
          <img :src="require(`@/assets/record_artist/${artist.image}`)" :alt="artist.name" class="artist-image" />
          <h2>{{ artist.name }}</h2>
          <p>{{ artist.genres.join(', ') }}</p>
          <p class="description">{{ artist.description }}</p>
          <div class="rating">
            <span>Đánh giá: {{ artist.rating }}/5</span>
          </div>
          <router-link :to="'/artist/' + artist.id" class="view-details">Xem chi tiết</router-link>
        </div>
      </div>
      <div v-else>
        <p>Không có nghệ sĩ nào để hiển thị.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ArtistsList',
    data() {
      return {
        artists: []
      };
    },
    async created() {
      try {
        const response = await fetch('http://localhost:3000/artists');
        this.artists = await response.json();
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu nghệ sĩ:', error);
      }
    }
  };
  </script>
  
  <style scoped>
  .artist-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px;
  }
  
  .artist-card {
    width: 300px;
    border: 1px solid #ddd;
    padding: 15px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }
  
  .artist-card:hover {
    transform: translateY(-5px);
  }
  
  .artist-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .description {
    font-size: 0.9em;
    color: #666;
    margin: 10px 0;
    height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .rating {
    color: #e83e8c;
    margin: 10px 0;
  }
  
  .view-details {
    display: inline-block;
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #e83e8c;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .view-details:hover {
    background-color: #c31f6b;
  }
  </style>