import { createWebHistory, createRouter } from "vue-router";
import Home from '@/components/ComHome'
import GioiThieu from '@/components/ComGioiThieu'
import LienHe from '@/components/ComLienHe'
import TinTuc from '@/components/ComTinTuc'
import Cart from '@/components/ComCart'
import Register from '@/components/ComRegister'
import Login from '@/components/ComLogin'
import Albums from '@/components/Albums.vue';
import AlbumDetail from '@/components/AlbumDetail.vue';
import Checkout from '@/components/Checkout.vue';
import OrderSuccess from '@/components/OrderSuccess.vue';
import ArtistsList from '@/components/Artists.vue';
import SearchList from '@/components/Search.vue';
//Tạo mảng chứa đường link
const routes = [
    {
        //nếu chọn component nào loat lên đầu tien thì path:"/"
        path: "/",
        name: "Home",
        component: Home
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
        path: "/checkout",
        name: "Checkout",
        component: Checkout
    },
    {
        path: "/ordersuccess/:orderId",
        name: "OrderSuccess",
        component: OrderSuccess
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
      {
        path: '/artists',
        name: 'ArtistsList',
        component: ArtistsList
      },
      {
        path: '/search',
        name: 'SearchList',
        component: SearchList
      },

]
//tạo đối tuongej router
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router