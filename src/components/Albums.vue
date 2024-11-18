<template>
  <div class="albums-page">
    <h1>Danh sách Albums</h1>
    <div class="album-list">
      <div v-for="album in albums" :key="album.id" class="album-item">
        <img :src="album.image" :alt="album.title" class="album-image" />
        <h2>{{ album.title }}</h2>
        <p>{{ album.artist }}</p>
        <p>{{ album.price }} VND</p>
        <router-link :to="`/albums/${album.id}`" class="view-btn"
          >Xem chi tiết</router-link
        >
      </div>
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
    };
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
</style>
