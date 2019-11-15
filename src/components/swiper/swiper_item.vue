<template>
<!-- 可以控制div 隐藏显示 -->
    <transition>
        <div class="swiper-item" v-if="isShow" :class="{reverse: reverse}">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    computed: {
        isShow () {
            // 根据用户的参数来控制显示哪一个
            return this.selected === this.name
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        reverse: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return { selected: ''}  // 当前用户传递过来的数据
    } 
}
</script>

<style>
.v-enter-active, .v-leave-active {
    transition: all 0.5s linear;
}
.v-leave-to{
    transform: translate(-100%)
}
.v-enter {
    transform: translate(100%)
}
.v-leave-to.reverse{
    transform: translate(100%)
}
.v-enter.reverse {
    transform: translate(-100%)
}
.v-enter-active {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
}
</style>