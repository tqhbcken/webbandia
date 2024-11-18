import { createWebHistory, createRouter } from "vue-router";
import Home from '@/components/ComHome'
import ThucDon from '@/components/ComThucDon'
import GioiThieu from '@/components/ComGioiThieu'
import LienHe from '@/components/ComLienHe'
import TinTuc from '@/components/ComTinTuc'
import ProductDetail from '@/components/ComProductDetail'
import Cart from '@/components/ComCart'
import Register from '@/components/ComRegister'
import Login from '@/components/ComLogin'
import Albums from '@/components/Albums.vue';
import AlbumDetail from '@/components/AlbumDetail.vue';
//Tạo mảng chứa đường link
const routes = [
    {
        //nếu chọn component nào loat lên đầu tien thì path:"/"
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/thucdon",
        name: "ThucDon",
        component: ThucDon
    },
    {
        path: "/gioithieu",
        name: "GioiThieu",
        component: GioiThieu
    },
    {
        path: "/lienhe",
        name: "LienHe",
        component: LienHe
    },
    {
        path: "/tintuc",
        name: "TinTuc",
        component: TinTuc
    },
    {
        path: "/product/:id",
        name: "ProductDetail",
        component: ProductDetail
    },
    {
        path: "/cart",
        name: "Cart",
        component: Cart
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    { path: '/albums', name: 'Albums', component:Albums },
    {
        path: '/albums/:id', 
        name: 'AlbumDetail',
        component: AlbumDetail,
        props: true,
      },

]
//tạo đối tuongej router
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router