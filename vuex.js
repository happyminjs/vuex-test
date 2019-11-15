import Vue from "vue";

let Vue;
class Store {
    constructor (options = {}) {
        this.s = new Vue({  // 核心， 定义了响应式变化， 数据更新 更新视图
            data() {
                return {state: options.state}
            }
        })
        let getters = options.getters;

        this.getters = {};
        // 计算属性
        Object.keys(getters).forEach(getterName => {
            Object.defineProperty(this.getters, getterName, {
                get: () => {
                    return getters[getterName](this.state)
                }
            })
        })
        let mutations = options.mutations; // 获取所有的同步的更新操作
        this.mutations = {};
        Object.keys(mutations).forEach(mutationName => {
            this.mutations[mutationName] = (payload) => {
                mutations[mutationName](this.state, payload)
            }
        })
    }
    // 提交更改 会在当前的 store上
    commit(mutationName, payload){ // 保证this
        this.mutations[mutationName](payload)
    }
    get state() {
        // 类的属性访问器
        return this.s.state
    }
}

const install = (_Vue) => {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {

        }
    })
}

export default Store();