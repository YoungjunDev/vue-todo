import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'


// use - Vue의 Plugin이라는 기능
Vue.use(Vuex);

const Storage = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                    if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
                    localStorage.getItem(localStorage.key(i));
                    console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    },
};


export const store = new Vuex.Store({
    state: {
        todoItems: Storage.fetch()
    },
    getters,
    mutations
});