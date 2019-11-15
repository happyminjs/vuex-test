import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)  // 使用这个插件的install方法

// vue data() compputed

export default new Vuex.Store({
    // 导出的是一个store 的实例
    state: {
        age: 10,
    },
    getters: {
        myAge(state) {
            return state.age + 19;
        }
    },
    mutations: {
        // 可以更改状态
        syncAdd(state, payload) {
            // $store.commit()
            state.age += payload;
        }
    },
    actions: {
        // 异步提交更改
    }
})