import Vue from 'vue'
import Vuex from 'vuex'
import todoApp from './modules/todoApp'


// use - Vue의 Plugin이라는 기능
Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        todoApp
    }
});