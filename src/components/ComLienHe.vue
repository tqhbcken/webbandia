<template>
  <div class="contact-container">
    <h1>Liên Hệ Với Chúng Tôi</h1>
    
    <div class="contact-info">
      <div class="info-item">
        <h3>Địa Chỉ</h3>
        <p>171 Nguyễn Kiệm, Quận Gò Vấp, TP.HCM</p>
      </div>

      <div class="info-item">
        <h3>Số Điện Thoại</h3>
        <p>0123 456 789</p>
      </div>

      <div class="info-item">
        <h3>Email</h3>
        <p>vinylstore@gmail.com</p>
      </div>

      <div class="info-item">
        <h3>Giờ Làm Việc</h3>
        <p>Thứ 2 - Chủ Nhật: 9:00 - 21:00</p>
      </div>
    </div>

    <div class="contact-form">
      <h2>Gửi Tin Nhắn Cho Chúng Tôi</h2>
      <form @submit.prevent="submitForm">
        <input type="text" v-model="name" placeholder="Họ và tên" required>
        <input type="email" v-model="email" placeholder="Email" required>
        <textarea v-model="message" placeholder="Nội dung tin nhắn" required></textarea>
        <button type="submit">Gửi Tin Nhắn</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComLienHe',
  data() {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    submitForm() {
      alert('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!')
      this.name = ''
      this.email = ''
      this.message = ''
    }
  }
}
</script>

<style scoped>
.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.info-item {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
}

.info-item h3 {
  color: #e83e8c;
  margin-bottom: 10px;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.contact-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input, textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 150px;
  resize: vertical;
}

button {
  padding: 12px;
  background: #e83e8c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background: #d63384;
}
</style>