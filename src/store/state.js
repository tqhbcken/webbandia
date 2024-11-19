// lưu trữ dữ liệu
const state={
    products:[],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    users:[],
    orders:[],
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null, 
    categories: [] 
}
export default state