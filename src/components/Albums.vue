<template>
  <div class="albums-page">
    <h1>Danh sách Albums</h1>
    <div class="album-list">
      <div v-for="album in paginatedAlbums" :key="album.id" class="album-item">
        <img :src="require(`@/assets/record_menu/${album.coverImage}`)" :alt="album.title" class="album-image" />
        <h2>{{ album.title }}</h2>
        <p>{{ album.artist }}</p>
        <p>{{ album.price }} VND</p>
        <router-link :to="`/albums/${album.id}`" class="view-btn"
          >Xem chi tiết</router-link
        >
      </div>
    </div>
    <div class="pagination">
      <button 
        :disabled="currentPage === 1" 
        @click="currentPage--" 
        class="page-btn"
      >
        &lt;
      </button>
      
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="['page-number', { active: currentPage === page }]"
      >
        {{ page }}
      </button>

      <button 
        :disabled="currentPage === totalPages" 
        @click="currentPage++" 
        class="page-btn"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import APIURL from "@/store/constraint";

export default {
  name: "AlbumList",
  data() {
    return {
      albums: [], // Dữ liệu sản phẩm albums
      currentPage: 1,
      itemsPerPage: 4
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.albums.length / this.itemsPerPage);
    },
    paginatedAlbums() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.albums.slice(start, end);
    }
  },
  async created() {
    try {
      const response = await axios.get(`${APIURL}/products`);
      this.albums = response.data; // Lấy toàn bộ sản phẩm
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu Albums:", error);
    }
  },
};
</script>

<style scoped>
.albums-page {
  padding: 20px;
}

.album-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.album-item {
  width: 200px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
}

.album-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.view-btn {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #e83e8c;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
}

.view-btn:hover {
  background-color: #c72b6d;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.page-btn {
  padding: 8px 15px;
  background-color: #e83e8c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.page-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.page-btn:hover:not(:disabled) {
  background-color: #c72b6d;
}

.page-number {
  padding: 8px 15px;
  background-color: #fff;
  color: #e83e8c;
  border: 1px solid #e83e8c;
  border-radius: 5px;
  cursor: pointer;
}

.page-number.active {
  background-color: #e83e8c;
  color: #fff;
}

.page-number:hover:not(.active) {
  background-color: #f8f9fa;
}
</style>
