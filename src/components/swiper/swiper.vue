<template>
  <div
    class="swiper"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  >
    <div class="viewport">
      <slot></slot>
    </div>
    <!-- 轮播的小点 dots -->
    <div class="dots">
      <span
        v-for="(item, index) in len"
        :key="index"
        :class="{active: index === active}"
        @click="select(index)"
      >{{item}}</span>
    </div>
    <!-- 左右按钮 -->
    <div class="btn-list">
      <button @click="select(active - 1)">左边</button>
      <button @click="select(active + 1)">右边</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentSelected: "",
      len: 0
    };
  },
  watch: {
    value() {
      this.showChild();
    }
  },
  methods: {
    touchstart(e) {
			this.mouseenter();
			this.startX = e.touches[0];
			console.log('start', this.startX.clientX)
		},
    touchmove() {
			console.log('move')
		},
    touchend(e) {
			let endX = e.changedTouches[0].clientX;
			let distance = endX - this.startX;
			if (distance < 0) {
				console.log('zuo zuo ');
				this.select(this.active + 1)
			} else {
				this.select(this.active - 1)
				console.log('Youyou')
			}
			this.run();
			console.log('end', e.changedTouches[0].clientX)
		},
    select(index) {
      // 点击dots 时，会触发对应的更新事件
      this.prevPosition = this.active; // 当选择时
      if (index === this.names.length) {
        index = 0;
      }
      if (index === -1) {
        index = this.names.length - 1;
      }
      this.$emit("input", this.names[index]);
    },
    mouseenter() {
      clearInterval(this.timer);
      this.timer = null;
    },
    mouseleave() {
      !this.timer && this.run();
    },
    showChild() {
      // 切换显示组件
      // 需要获取当前从谁开始  从哪个 name 属性开始
      this.currentSelected = this.value || this.$children[0].name;
      // 1、让对应的的儿子显示 其他人隐藏
      this.$children.forEach(vm => {
        this.$nextTick(() => {
          // 我们需要更改完 是正向还是反向的 再去更新视图
          vm.selected = this.currentSelected; // 给子组件说哪个
        });

        // 要给儿子说 你是正着走 还是反着走
        let reverse = this.prevPosition > this.active ? true : false;

        // 考虑临界值的问题
        if (this.timer) {
          if (this.prevPosition === 0 && this.active === this.len - 1) {
            reverse = true;
          }
          if (this.prevPosition === this.len - 1 && this.active === 0) {
            reverse = false;
          }
        }
        // 和儿子节点说 是正的还是反的
        vm.reverse = reverse;
      });
    },
    run() {
      if (this.autoPlay) {
        this.timer = setInterval(() => {
          // 把索引往后调整 box1 box2 之后把调整的结果，发送给外面
          // 确定当前是第一个
          let index = this.active;
          let newIndex = index + 1;
          this.select(newIndex);
        }, 3000);
      }
    }
  },
  computed: {
    active() {
      return this.names.indexOf(this.currentSelected);
    }
  },
  beforeDestory() {
    clearInterval(this.timer);
  },
  mounted() {
    this.names = this.$children.map(child => child.name);
    this.len = this.names.length;
    this.showChild(); // 1、显示默认节点
    this.run(); // 2、自动轮播
    // 3、控制动画的方向
    // 先记录当前的值
    this.prevPosition = this.active; // 记录刚进来的值
  }
};
</script>

<style>
.swiper {
  width: 100%;
  border: 4px solid rebeccapurple;
  margin: 0 auto;
}
.viewport {
  position: relative;
  overflow: hidden;
  height: 150px;
}
.dots {
  display: flex;
  justify-content: center;
}
.dots span {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  margin: 0 10px;
  border: 1px solid royalblue;
  cursor: pointer;
}
.active {
  background: red;
}
</style>