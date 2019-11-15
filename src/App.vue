<template>
  <div id="app">
    <Swiper v-model="selected" autoPlay>
      <SwiperItem name="box1">
        <div class="content" style="background: red">内容1</div>
      </SwiperItem>
      <SwiperItem name="box2">
        <div class="content" style="background: blue">内容2</div>
      </SwiperItem>
      <SwiperItem name="box3">
        <div class="content" style="background: green">内容3</div>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Swiper from './components/swiper/swiper'
import SwiperItem from './components/swiper/swiper_item'
export default {
  name: 'app',
  data() {
    return {
      selected: 'box2'
    }
  },
  components: {
    // HelloWorld
    Swiper,
    SwiperItem
  },
  mounted(){
    setTimeout(() => {
      this.selected = 'box3'
    }, 1000);
  },
  methods: {
    add() {
      // this.$store.commit()
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.content {
  width: 100%;
  height: 150px;
}
</style>
