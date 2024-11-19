<template>
    <footer>
         <div class="footer-container">
             <div class="footer-column">
                 <h3>Về chúng tôi</h3>
                 <p>Chuyên cung cấp đĩa than chất lượng cao</p>
                 <p>Email: vinylstore@gmail.com</p>
             </div>
             <div class="footer-column">
                 <h3>Danh mục sản phẩm</h3>
                 <ul>
                     <li><a href="#">Đĩa than Rock</a></li>
                     <li><a href="#">Đĩa than Jazz</a></li>
                     <li><a href="#">Đĩa than Classical</a></li>
                     <li><a href="#">Phụ kiện đĩa than</a></li>
                 </ul>
             </div>
             <div class="footer-column">
                 <h3>Liên hệ</h3>
                 <p>Địa chỉ: 171 Nguyễn Kiệm, Quận Gò Vấp, TP.HCM</p>
                 <p>Điện thoại: 0123-456-789</p>
                 <p>Giờ mở cửa: 9:00 - 21:00</p>
             </div>
             <div class="footer-column">
                 <h3>Theo dõi chúng tôi</h3>
                 <ul class="social-links">
                     <li><a href="#"><i class="fab fa-facebook"></i> Facebook</a></li>
                     <li><a href="#"><i class="fab fa-instagram"></i> Instagram</a></li>
                     <li><a href="#"><i class="fab fa-youtube"></i> Youtube</a></li>
                 </ul>
             </div>
         </div>
     </footer>
 </template>
 
 <script>
 export default {
   name: 'ComFooter'
 }
 </script>
 
 <style>
 footer {
     background-color: #1a1a1a;
     color: #ffffff;
     padding: 40px 0;
     font-family: 'Roboto', sans-serif;
 }
 
 .footer-container {
     display: flex;
     justify-content: space-between;
     flex-wrap: wrap;
     max-width: 1200px;
     margin: 0 auto;
     padding: 0 20px;
 }
 
 .footer-column {
     flex: 1;
     padding: 20px;
     min-width: 250px;
     box-sizing: border-box;
 }
 
 .footer-column h3 {
     margin-top: 0;
     margin-bottom: 20px;
     font-size: 1.2em;
     color: #fcb034;
     text-transform: uppercase;
     letter-spacing: 1px;
 }
 
 .footer-column p {
     line-height: 1.6;
     margin-bottom: 10px;
 }
 
 .footer-column ul {
     list-style: none;
     padding: 0;
     margin: 0;
 }
 
 .footer-column ul li {
     margin-bottom: 10px;
 }
 
 .footer-column a {
     color: #ffffff;
     text-decoration: none;
     transition: color 0.3s ease;
 }
 
 .footer-column a:hover {
     color: #fcb034;
     text-decoration: none;
 }

 .social-links li a {
     display: flex;
     align-items: center;
     gap: 10px;
 }

 .social-links i {
     font-size: 1.2em;
 }

 @media (max-width: 768px) {
     .footer-column {
         min-width: 100%;
     }
 }
 </style>