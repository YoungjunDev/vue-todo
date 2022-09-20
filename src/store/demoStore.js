import Vue from 'vue'
import Vuex from 'vuex'


// use - Vue의 Plugin이라는 기능
Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
         price: 100
    },
    getters: {
        originalPrice(state){
            return state.price;
        },
        doublePrice(state){
            return state.price * 2;
        },
        triplePrice(state){
            return state.price * 3;
        }
    }
});