import Vue from 'vue'
import Vuex from 'vuex'


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
    getters: {
        storedTodoItems(state) {
            return state.todoItems;
        }
    },
    mutations: {
        addOneItem(state, todoItem) {
            const obj = { completed: false, item: todoItem };
            // localStorage.setItem(this.todoItem, obj);
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeOneItem(state, payload) {
            localStorage.removeItem(payload.todoItem.item);
            state.todoItems.splice(payload.idx, 1);
        },
        toggleOneItem(state, payload) {
            // => todoitems -> propsdata로 내림 -> 내린 데이터에서 todoItem, idx 추출
            // -> v-on 메서드 인자로 들어갔다가 -> 버튼 이벤트로 다시 데이터를 App으로 올려 수정
            //->  안티 패턴 (안좋음)
            // todoItem.completed = !todoItem.completed;
            // ----------- 같은 동작 다른 데이터 흐름 ----------------------
            // App.vue란 container의 데이터를 직접 바꾸는 것이 좋다.
            state.todoItems[payload.idx].completed = !state.todoItems[payload.idx].completed;
            //localStorage의 데이터를 갱신
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
        },
        clearAllItems(state) {
            localStorage.clear();
            state.todoItems = [];
        }
    }
});