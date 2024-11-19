<template>
  <div class="about-container">
    <div class="hero-section">
      <h1>Chào mừng đến với VinylStore</h1>
      <p class="subtitle">Nơi âm nhạc trở nên sống động</p>
    </div>

    <div class="content-section">
      <div class="intro-text">
        <h2>Về Chúng Tôi</h2>
        <p>VinylStore là điểm đến lý tưởng cho những người yêu thích âm nhạc và đặc biệt là văn hóa đĩa than. Chúng tôi tự hào mang đến cho bạn:</p>
      </div>

      <div class="features">
        <div class="feature-item">
          <i class="fas fa-record-vinyl"></i>
          <h3>Bộ Sưu Tập Đa Dạng</h3>
          <p>Từ Rock, Jazz, Classical đến Pop - đầy đủ các thể loại nhạc cho mọi gu thưởng thức</p>
        </div>

        <div class="feature-item">
          <i class="fas fa-award"></i>
          <h3>Chất Lượng Đảm Bảo</h3>
          <p>Tất cả đĩa than đều được tuyển chọn kỹ lưỡng và bảo quản trong điều kiện tốt nhất</p>
        </div>

        <div class="feature-item">
          <i class="fas fa-truck"></i>
          <h3>Dịch Vụ Chuyên Nghiệp</h3>
          <p>Giao hàng nhanh chóng, đóng gói cẩn thận và chính sách đổi trả linh hoạt</p>
        </div>
      </div>

      <div class="why-choose-us">
        <h2>Tại Sao Chọn VinylStore?</h2>
        <ul>
          <li>Kho đĩa than phong phú với hơn 1000+ tựa album</li>
          <li>Đội ngũ tư vấn am hiểu về âm nhạc và đĩa than</li>
          <li>Giá cả cạnh tranh và nhiều chương trình khuyến mãi</li>
          <li>Cộng đồng người yêu nhạc sôi động</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComGioiThieu'
}
</script>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero-section {
  text-align: center;
  padding: 60px 0;
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('@/assets/record_artist/tylor_the_creator.png');
  background-size: cover;
  color: white;
  border-radius: 10px;
  margin-bottom: 40px;
}

.hero-section h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.5em;
  font-style: italic;
}

.content-section {
  padding: 20px;
}

.intro-text {
  text-align: center;
  margin-bottom: 40px;
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 40px 0;
}

.feature-item {
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background-color: #f8f9fa;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-item i {
  font-size: 2.5em;
  color: #e83e8c;
  margin-bottom: 15px;
}

.why-choose-us {
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 8px;
  margin-top: 40px;
}

.why-choose-us ul {
  list-style-type: none;
  padding: 0;
}

.why-choose-us li {
  margin: 10px 0;
  padding-left: 20px;
  position: relative;
}

.why-choose-us li:before {
  content: "•";
  color: #e83e8c;
  font-weight: bold;
  position: absolute;
  left: 0;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

h3 {
  color: #444;
  margin: 15px 0;
}
</style>