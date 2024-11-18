<template>
  <div>
    <p>Giá trị đếm:{{count}}</p>
    <p>Tên:{{name}}</p>
    <p>Đếm * 2={{tinhcount}}</p>
    <button @click="increment">Count++</button>
    <button @click="changename">Thay đổi name</button>
    <button @click="incrementAysnc">Count++Async</button>
    <!-- form -->
    <form @submit.prevent="submit">
      <div>
        <label for="name">Tên</label>
        <br />
        <input
          type="text"
          v-model="form.ten"
          name="name"
          id="name"
          class="form-field"
        />
      </div>
      
      <div>
        <label for="name">Giá</label>
        <br />
        <input
          type="text"
          v-model="form.gia"
          name="gia"
          id="gia"
          class="form-field"
        />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
    <ul>
      <li v-for="item in products" :key="item.id">{{item.ten}}</li>
    </ul>
    
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
// import { mapState } from 'vuex'
export default {
  data()
  {
    return{
      newname:"Update vuex",
      form:{
                ten:"",///bbb
                gia:0//45
            },
    }
  },
  computed:{
    // c1: gọi state
    // count()
    // {
    //   return this.$store.state.count
    // },
    // name()
    // {
    //   return this.$store.state.name
    // }
    //c2: spread ...mapState(['tt',..])
    // ...mapState(['count','name'])
   // c1: gọi getter
    // count()
    // {
    //   return this.$store.getters.count
    // },
    // name()
    // {
    //   return this.$store.getters.name
    // }
    // c2: dùng mapGetters
    ...mapGetters(['count','name','tinhcount','products'])
  },
  methods:{
    // increment()
    // {
    //   this.$store.commit('increment')
    // },
    // changename()
    // {
    //   this.$store.commit('setName',this.newname)
    // },
    ...mapMutations(['increment','setName']),
    changename()
    {
      this.setName(this.newname)
    },
    // incrementAysnc()
    // {
    //   this.$store.dispatch('incrementAysnc')
    // }
    ...mapActions(['incrementAysnc','fetchDataProduct']),
    submit()
    {
      this.$store.dispatch('submit',this.form)
    }
  },
  created()
  {
    this.fetchDataProduct()
  },
  mounted()
  {
    this.fetchDataProduct()
  }
}
</script>

<style>

</style>